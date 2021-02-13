<?php
/**
 * Plugin Name:     oddEvan DeviantArt Embed
 * Plugin URI:      https://github.com/oddevan/oddevan-deviantart-embed
 * Description:     Embed a work from DeviantArt into a post using the block editor.
 * Version:         1.0.0
 * Author:          oddEvan
 * Author URI:      https://eph.me/
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     oddevan-deviantart-embed
 *
 * @package         oddEvan\DeviantArtEmbed
 */

namespace oddEvan\DeviantArtEmbed;

use WP_REST_Request;
use WP_REST_Response;
use WP_Error;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Register the block with WordPress.
 *
 * @author oddEvan
 * @since 0.0.1
 */
function register_block() {

	// Define our assets.
	$editor_script   = 'build/index.js';
	$editor_style    = 'build/editor.css';
	$frontend_style  = 'build/style.css';
	$frontend_script = 'build/frontend.js';

	// Verify we have an editor script.
	if ( ! file_exists( plugin_dir_path( __FILE__ ) . $editor_script ) ) {
		wp_die( esc_html__( 'Whoops! You need to run `npm run build` for the oddEvan Deviant Art Embed first.', 'oddevan-deviantart-embed' ) );
	}

	// Autoload dependencies and version.
	$asset_file = require plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	// Register editor script.
	wp_register_script(
		'deviant-art-embed-editor-script',
		plugins_url( $editor_script, __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);

	// Register editor style.
	if ( file_exists( plugin_dir_path( __FILE__ ) . $editor_style ) ) {
		wp_register_style(
			'deviant-art-embed-editor-style',
			plugins_url( $editor_style, __FILE__ ),
			[ 'wp-edit-blocks' ],
			filemtime( plugin_dir_path( __FILE__ ) . $editor_style )
		);
	}

	// Register frontend style.
	if ( file_exists( plugin_dir_path( __FILE__ ) . $frontend_style ) ) {
		wp_register_style(
			'deviant-art-embed-style',
			plugins_url( $frontend_style, __FILE__ ),
			[],
			filemtime( plugin_dir_path( __FILE__ ) . $frontend_style )
		);
	}

	// Register block with WordPress.
	register_block_type( 'oddevan/deviant-art-embed', array(
		'editor_script' => 'deviant-art-embed-editor-script',
		'editor_style'  => 'deviant-art-embed-editor-style',
		'style'         => 'deviant-art-embed-style',
	) );

	// Register frontend script.
	if ( file_exists( plugin_dir_path( __FILE__ ) . $frontend_script ) ) {
		wp_enqueue_script(
			'deviant-art-embed-frontend-script',
			plugins_url( $frontend_script, __FILE__ ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);
	}
}
add_action( 'init', __NAMESPACE__ . '\register_block' );

/**
 * Proxy the call to DeviantArt's oEmbed API. This resolves an issue where
 * their API server is not properly configured for CORS.
 *
 * @author Evan Hildreth <me@eph.me>
 * @since 1.0.0
 *
 * @param WP_REST_Request $data Data from REST request.
 * @return WP_REST_Response Fetched JSON object from DeviantArt
 */
function proxy_deviantart_oembed( $data ) {
	$url = $data->get_param( 'url' );
	if ( ! is_valid_url( $url ) ) {
		return new WP_Error(
			'error',
			'Error: not a DeviantArt URL',
			[ 'input' => $data ],
		);
	}

	$da_response = wp_remote_get(
		'https://backend.deviantart.com/oembed?url=' . $data->get_param( 'url' ),
		[ 'headers' => [ 'User-Agent' => 'WordPress OEmbed Consumer' ] ]
	);

	if ( empty( $da_response ) || 200 !== $da_response['response']['code'] ) {
		return new WP_Error(
			'error',
			'Error in response from DeviantArt',
			[
				'input'    => $data,
				'response' => $da_response,
			]
		);
	}

	return new WP_REST_Response( json_decode( $da_response['body'] ) );
}

/**
 * Security check for the DeviantArt proxy endpoint. Currently limited to logged-
 * in users with access to the editor.
 *
 * @author Evan Hildreth <me@eph.me>
 * @since 2020-08-14
 *
 * @return boolean True if current user can access the deviantart proxy endpoint
 */
function proxy_deviantart_oembed_security() {
	// Should only be used by logged-in users capable of using the editor.
	return current_user_can( 'edit_posts' );
}

add_action( 'rest_api_init', function () {
	register_rest_route( 'oddevan/v1', '/devArtProxy/', array(
		'methods'             => 'GET',
		'callback'            => __NAMESPACE__ . '\proxy_deviantart_oembed',
		'permission_callback' => __NAMESPACE__ . '\proxy_deviantart_oembed_security',
	) );
} );

/**
 * Check to make sure this is a DeviantArt-related URL
 *
 * @author Evan Hildreth <me@eph.me>
 * @since 2020-08-14
 *
 * @param string $url URL to check.
 * @return bool true if URL is valid
 */
function is_valid_url( $url ) {
	$server = wp_parse_url( $url, PHP_URL_HOST );

	// parse_url will return false if $url is not a URL.
	if ( ! $server ) {
		return false;
	}

	$allowed_domains = [
		'deviantart.com',
		'fav.me',
		'sta.sh',
	];

	foreach ( $allowed_domains as $domain ) {
		if ( 0 === substr_compare( $server, $domain, -strlen( $domain ) ) ) {
			return true;
		}
	}
	return false;
}

function register_providers() {
	$callback = __NAMESPACE__ . '\handle_deviantart';

	wp_embed_register_handler( 'deviantart-favme', '#http://fav.me/*+#', $callback, 10 );
	wp_embed_register_handler( 'deviantart-stash', '#https://sta.sh/*+#', $callback, 10 );
	wp_embed_register_handler( 'deviantart-main', '#https://www.deviantart.com/*+#', $callback, 10 );
}

function handle_deviantart( $matches, $attr, $url, $rawattr ) {
	$http_options = [
		'headers' => [
			'User-Agent'      => 'WordPress OEmbed Consumer',
		],
	];

	$da_response = \wp_remote_get( 'https://backend.deviantart.com/oembed?url=' . rawurlencode( $url ), $http_options );
	if ( empty( $da_response ) || 200 !== $da_response['response']['code'] ) {
		return "<p><!-- Could not embed --><a href=\"{$url}\">View Deviation</a></p>";
	}

	$deviation = json_decode( $da_response['body'] );
	$copyright = $deviation->copyright->_attributes;

	$html = <<<EOF
<div style="background:#000;color:#b1b1b9;padding:10px">
	<p style="line-height:28px;margin:0;padding:0">
		<svg style="display:inline;margin:0" xmlns="http://www.w3.org/2000/svg" width="15" height="28" viewBox="0 0 100 167">
			<path fill="#00e59b" d="M100 0H71.32l-3.06 3.04-14.59 27.85-4.26 2.46H0v41.62h26.4l2.75 2.75L0 133.36v33.25l28.7-.01 3.07-3.05 14.62-27.86 4.17-2.41H100v-41.6H73.52L70.84 89 100 33.33"></path>
		</svg>
		<svg style="display:inline;margin:0" xmlns="http://www.w3.org/2000/svg" width="76" height="28" viewBox="2 25 68 22">
			<path fill="#ffffff" d="M7.29 42.783l1.07-2.05.5 2.05H7.29zm.1-5.737l-4.89 9.34h2.9l.71-1.36h3.28l.32 1.36h2.9l-2.24-9.34H7.39zm9.79 4.367h-1.24v-1.889h1.24c.76 0 1.04.38 1.04.95 0 .566-.29.936-1.04.939m3.88-.983c0-2.15-1.45-3.38-3.49-3.38h-4.43v9.34h2.79v-2.72H17.17l1.35 2.73h2.9l-1.73-3.3c.86-.55 1.37-1.46 1.37-2.67m.41-3.384v2.476h2.65v6.867h1.59l1.2-2.299v-4.568h2.39l1.3-2.476zm15.66-11.434h2.79v9.342h-2.79v-9.342zm-23.75.005l-1.25 2.4h.77c1.38 0 2.25.88 2.25 2.27 0 1.37-.87 2.25-2.25 2.25h-.87v-4.33l-2.7 5.16v1.59h3.76c3.03 0 4.81-1.83 4.81-4.67-.01-2.757-1.67-4.557-4.52-4.67m5.25 9.337h7.13v-2.476h-4.34v-1.01h3.99v-2.37h-3.99v-1.01h4.34v-2.476h-7.13zm12.1-3.689l-1.36-5.653h-2.9l2.24 9.342h2.98l4.9-9.342h-2.91zm29.64-5.654v2.477h2.64v6.867h1.59l1.21-2.299v-4.568h2.39l1.3-2.477zM45.25 31.35l1.07-2.05.49 2.05h-1.56zm.11-5.738l-4.89 9.34h2.9l.71-1.36h3.27l.32 1.36h2.9l-2.24-9.34h-2.97zm11.62 4.425l-3.12-4.425H51.1v9.342h2.79V30.21l3.47 4.744h2.41v-9.342h-2.79z"></path>
		</svg>
	</p>
	<a href="$url">
		<img style="height:auto;margin:10px 0;max-width:100%" src="$deviation->url" width="$deviation->width" height="$deviation->height" alt="$deviation->title">
	</a>
	<p style="font-family:sans-serif;font-size:16px;font-weight:700;margin:0">
		<a href="$url" style="color:#fff;text-decoration:underline">$deviation->title</a>
		by
		<a href="$deviation->author_url" style="color:#fff;text-decoration:underline">$deviation->author_name</a>
	</p>
</div>
EOF;

	return $html;
}

add_action( 'init', __NAMESPACE__ . '\register_providers' );
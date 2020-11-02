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

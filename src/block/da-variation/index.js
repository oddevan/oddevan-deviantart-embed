/**
 * REGISTER: oddEvan Deviant Art Embed.
 */
// import edit from './edit';
// import save from './save';
import DaLogo from './DaLogo';

import { __ } from '@wordpress/i18n';
import { registerBlockVariation } from '@wordpress/blocks';

registerBlockVariation( 'core/embed', {
	name: 'deviantart',
	title: __( 'DeviantArt', 'oddevan-deviantart-embed' ),
	icon: DaLogo,
	category: 'embed',
	keywords: [
		__( 'oddEvan', 'oddevan-deviantart-embed' ),
		__( 'deviantart embed', 'oddevan-deviantart-embed' ),
	],
	patterns: [
		/^https?:\/\/([\w-]+\.)?deviantart\.com\/.+/i,
		/^https?:\/\/sta\.sh\/.+/i,
		/^https?:\/\/fav\.me\/.+/i,
	],
	attributes: { providerNameSlug: 'deviantart', responsive: true },
} );

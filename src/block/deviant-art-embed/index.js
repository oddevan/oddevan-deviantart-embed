/**
 * REGISTER: oddEvan Deviant Art Embed.
 */
import edit from './edit';
import save from './save';
import DaLogo from './DaLogo';

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'oddevan/deviantart-embed', {
	title: __( 'DeviantArt', 'oddevan-deviantart-embed' ),
	icon: DaLogo,
	category: 'embed',
	keywords: [
		__( 'oddEvan', 'oddevan-deviantart-embed' ),
		__( 'deviantart embed', 'oddevan-deviantart-embed' ),
	],
	attributes: {
		embedUrl: {
			type: 'string'
		},
		embedData: {
			type: 'object',
			default: {}
		},
	},
	edit,
	save,
} );

/**
 * REGISTER: oddEvan Deviant Art Embed.
 */
import edit from './edit';
import save from './save';

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'oddevan/deviant-art-embed', {
	title: __( 'Deviant Art', 'deviant-art-embed' ),
	icon: 'edit',
	category: 'embed',
	keywords: [
		__( 'oddEvan', 'deviant-art-embed' ),
		__( 'deviant-art-embed', 'deviant-art-embed' ),
	],
	attributes: {
		url: {
			type: 'string',
			source: 'attribute',
		},
	},
	edit,
	save,
} );

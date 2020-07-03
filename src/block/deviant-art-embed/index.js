/**
 * REGISTER: oddEvan Deviant Art Embed.
 */
import edit from './edit';
import save from './save';

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'odd-evan/deviant-art-embed', {
	title: __( 'oddEvan Deviant Art Embed', 'deviant-art-embed' ),
	icon: 'edit',
	category: 'common',
	keywords: [
		__( 'oddEvan', 'deviant-art-embed' ),
		__( 'deviant-art-embed', 'deviant-art-embed' ),
	],
	attributes: {
		content: {
			type: 'array',
			source: 'children',
			selector: 'p',
		},
	},
	edit,
	save,
} );

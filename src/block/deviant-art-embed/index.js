/**
 * REGISTER: oddEvan Deviant Art Embed.
 */
import edit from './edit';
import save from './save';

import { __ } from '@wordpress/i18n';
import { registerBlockType, createBlock } from '@wordpress/blocks';

const blockInfo = {
	title: __( 'Depreciated', 'oddevan-deviantart-embed' ),
	category: '',
	attributes: {
		embedUrl: {
			type: 'string'
		},
		embedData: {
			type: 'object',
			default: {}
		},
	},
	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ 'core/embed' ],
				transform: ( { embedUrl } ) => {
					return createBlock( 'core/embed', {
						url: embedUrl,
					} );
				},
			},
		]
	},
	edit,
	save,
}

registerBlockType( 'oddevan/deviantart-embed', blockInfo );

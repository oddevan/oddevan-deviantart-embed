/**
 * EDIT: oddEvan Deviant Art Embed
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const Edit = ( props ) => {
	const {
		attributes: {
			content,
		},
		className,
		setAttributes,
	} = props;

	// Update field content on change.
	const onChangeContent = ( newContent ) => {
		setAttributes( { content: newContent } );
	};

	return (
		<RichText
			tagName="p"
			className={ className }
			onChange={ onChangeContent }
			value={ content }
			placeholder={ __( 'oddEvan Deviant Art Embed Demo...', 'deviant-art-embed' ) }
		/>
	);
};

export default Edit;

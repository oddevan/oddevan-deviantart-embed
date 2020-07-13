/**
 * EDIT: oddEvan Deviant Art Embed
 */
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const Edit = ( props ) => {
	const {
		attributes: {
			embedUrl,
		},
		className,
		setAttributes,
	} = props;

	return (
		<TextControl
      label={__('DeviantArt post', 'deviant-art-embed')}
      className={className}
      value={embedUrl}
      onChange={(embedUrl) => setAttributes({ embedUrl })}
    />
	);
};

export default Edit;

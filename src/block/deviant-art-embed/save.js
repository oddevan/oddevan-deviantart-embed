/**
 * SAVE: oddEvan Deviant Art Embed
 */
import { RichText } from '@wordpress/block-editor';

const Save = ( props ) => {
	const {
		attributes: {
			url,
		},
		className,
	} = props;

	const oEmbedUrl = `https://backend.deviantart.com/oembed?url=${encodeURIComponent(url)}`;
	console.log('eph', oEmbedUrl);
	fetch(oEmbedUrl)
		.then(data => console.log('Success', data))
		.catch(data => console.log('Error', data));

	return (
		<div
			class={className}
		>Coming soon</div>
	);
};

export default Save;

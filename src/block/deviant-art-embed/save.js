/**
 * SAVE: oddEvan Deviant Art Embed
 */
import apiFetch from '@wordpress/api-fetch';

const Save = ( props ) => {
	const {
		attributes: {
			url,
		},
		className,
	} = props;

	const oEmbedUrl = `oddevan/v1/devArtProxy?url=${encodeURIComponent(url)}`;
	console.log('eph', oEmbedUrl);
	apiFetch({ path: oEmbedUrl })
		.then(data => console.log('Success', data))
		.catch(data => console.log('Error', data));

	return (
		<div
			class={className}
		>Coming soon</div>
	);
};

export default Save;

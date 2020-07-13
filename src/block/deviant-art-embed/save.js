/**
 * SAVE: oddEvan Deviant Art Embed
 */
import apiFetch from '@wordpress/api-fetch';

async function getEmbedObject(url) {
	const oEmbedUrl = `oddevan/v1/devArtProxy?url=${encodeURIComponent(url)}`;

	try {
		const response = await apiFetch({ path: oEmbedUrl });
		return response;
	} catch(e) {
		console.log('Error in DA block', { url: oEmbedUrl, error: e });
		return {}
	}
}

const Save = async ( props ) => {
	const {
		attributes: {
			url,
		},
		className,
	} = props;

	
	const daResponse = await getEmbedObject(url);
	
	console.log({response: daResponse});

	return (
		<div class={className}>
			Working on it...
		</div>
	);
};

export default Save;

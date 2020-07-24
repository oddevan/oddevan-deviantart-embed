/**
 * SAVE: oddEvan Deviant Art Embed
 */
import apiFetch from '@wordpress/api-fetch';
import DeviantArtEmbed from './DeviantArtEmbed';

const { __ } = wp.i18n;

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
			embedUrl,
		},
		className,
	} = props;

	console.log('Saving DA Embed', props);
	
	const daResponse = await getEmbedObject(embedUrl);

	if (!daResponse) {
		console.log('No response, outputting blank div', daResponse);
		return (
			<div class={className}>
			</div>
		)
	}

	console.log('Calling DeviantArtEmbed component');
	return (
		<div className={className}>
			<DeviantArtEmbed response={daResponse} />
		</div>
	);
};

export default Save;

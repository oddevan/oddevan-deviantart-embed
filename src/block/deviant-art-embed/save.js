/**
 * SAVE: oddEvan Deviant Art Embed
 */
import apiFetch from '@wordpress/api-fetch';

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
	
	const daResponse = await getEmbedObject(embedUrl);

	if (!daResponse) {
		return (
			<div class={className}>
			</div>
		)
	}
	
	const {
		author_name,
		author_url,
		height,
		title,
		url,
		width,
	} = daResponse;

	return (
		<div class={className}>
			<img
				src={url}
				width={width}
				height={height}
				alt={title}
			/>
			<p>
				<a href={embedUrl}>
					{title}
				</a>
				{__(' by ', 'deviant-art-embed')}
				<a href={author_url}>
					{author_name}
				</a>
			</p>
		</div>
	);
};

export default Save;

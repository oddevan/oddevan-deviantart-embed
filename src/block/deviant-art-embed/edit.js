/**
 * EDIT: oddEvan Deviant Art Embed
 */
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

import { useEffect } from 'react';
import DeviantArtEmbed from './DeviantArtEmbed';

async function getEmbedObject(url, setAttributes) {
	const oEmbedUrl = `oddevan/v1/devArtProxy?url=${encodeURIComponent(url)}`;

	try {
		const response = await apiFetch({ path: oEmbedUrl });
		console.log(response);
		setAttributes({ embedData: response });
		return response;
	} catch(e) {
		console.log('Error in DA block', { url: oEmbedUrl, error: e });
		return {}
	}
}

const Edit = ( props ) => {
	const {
		attributes: {
			embedUrl,
			embedData,
		},
		className,
		setAttributes,
	} = props;

	useEffect(() => {
		if (embedUrl !== '') {
			const getDaResponse = async () => {
				const result = await getEmbedObject(embedUrl, setAttributes);
				return result;
			};
			const daResponse = getDaResponse();
			console.log('daResponse', daResponse);
			if (daResponse) {
				setAttributes({ embedData: daResponse });
			}
		}
	}, [embedUrl]);

	return (
		<div className={className}>
			<TextControl
				label={__('DeviantArt post', 'deviant-art-embed')}
				value={embedUrl}
				onChange={(embedUrl) => setAttributes({ embedUrl })}
			/>
			{/*embedData && <DeviantArtEmbed response={embedData} />*/}
		</div>
	);
};

export default Edit;

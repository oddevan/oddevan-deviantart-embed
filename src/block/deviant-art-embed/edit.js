/**
 * EDIT: oddEvan Deviant Art Embed
 */
import { TextControl, Fragment } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

import { useEffect } from 'react';
import DeviantArtEmbed from './DeviantArtEmbed';

async function fetchAndSetResponse(url, setAttributes) {
	const oEmbedUrl = `oddevan/v1/devArtProxy?url=${encodeURIComponent(url)}`;

	try {
		const response = await apiFetch({ path: oEmbedUrl });
		setAttributes({ embedData: response });
	} catch(e) {
		console.log('Error in DA block', { url: oEmbedUrl, error: e });
		setAttributes({ embedData: {} });
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
		setAttributes({ embedData: {} });
		fetchAndSetResponse(embedUrl, setAttributes);
	}, [embedUrl]);

	const showEmbed = (embedData.hasOwnProperty('url'));
	const {
		author_name,
		author_url,
		height,
		title,
		url,
		width,
	} = embedData;

	return (
		<div className={className}>
			<TextControl
				label={__('DeviantArt post', 'deviant-art-embed')}
				value={embedUrl}
				onChange={(embedUrl) => setAttributes({ embedUrl })}
			/>
			{showEmbed ? (
				<div className="deviantart-embed">
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
			) : (
				<div className="deviantart-embed" />
			)}
		</div>
	);
};

export default Edit;

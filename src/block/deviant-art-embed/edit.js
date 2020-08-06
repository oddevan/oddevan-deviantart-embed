/**
 * EDIT: oddEvan Deviant Art Embed
 */
import { TextControl, Fragment } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

import { useEffect } from 'react';
import DeviantArtEmbed from './DeviantArtEmbed';
import DaLogo from './DaLogo';
import DaWordmark from './DaWordmark';

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
				<div className="oddevan-deviantart-embed">
					<p className="deviantart-header">
						<span className="deviantart-logo">
							<DaLogo />
						</span>
						<span className="deviantart-wordmark">
							<DaWordmark />
						</span>
					</p>
					<a href={embedUrl}>
						<img
							className="deviation"
							src={url}
							width={width}
							height={height}
							alt={title}
						/>
					</a>
					<p className="deviation-title">
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

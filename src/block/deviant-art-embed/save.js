/**
 * SAVE: oddEvan Deviant Art Embed
 */

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

const sampleObject = JSON.parse('{"version":"1.0","type":"photo","title":"Lynn\'s First Day","category":"Visual Art","url":"https:\/\/images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com\/f\/32cd1746-0ab7-4ed2-a468-1688f385ab20\/de186p7-0612edfc-933c-45b0-8833-03ab3a777214.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMzJjZDE3NDYtMGFiNy00ZWQyLWE0NjgtMTY4OGYzODVhYjIwXC9kZTE4NnA3LTA2MTJlZGZjLTkzM2MtNDViMC04ODMzLTAzYWIzYTc3NzIxNC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.qZ8xn-Nc_vYanhHflvhRGrPDxzZsRANHOVudIePR27w","author_name":"SepiSnake","author_url":"https:\/\/www.deviantart.com\/sepisnake","provider_name":"DeviantArt","provider_url":"https:\/\/www.deviantart.com","safety":"nonadult","pubdate":"2020-07-13T05:12:40-07:00","community":{"statistics":{"_attributes":{"views":355,"favorites":77,"comments":22,"downloads":6}}},"tags":"apron, cuteness, lynn, naga, mernag","copyright":{"_attributes":{"url":"https:\/\/www.deviantart.com\/sepisnake","year":"2020","entity":"SepiSnake"}},"width":"600","height":"1200","imagetype":"png","thumbnail_url":"https:\/\/images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com\/f\/32cd1746-0ab7-4ed2-a468-1688f385ab20\/de186p7-0612edfc-933c-45b0-8833-03ab3a777214.png\/v1\/fit\/w_300,h_900,strp\/lynn_s_first_day_by_sepisnake_de186p7-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMjAwIiwicGF0aCI6IlwvZlwvMzJjZDE3NDYtMGFiNy00ZWQyLWE0NjgtMTY4OGYzODVhYjIwXC9kZTE4NnA3LTA2MTJlZGZjLTkzM2MtNDViMC04ODMzLTAzYWIzYTc3NzIxNC5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.GSgi48z5eqJfpcsEt_wWSvL5VnZD6OLO05VfcZ06kFo","thumbnail_width":300,"thumbnail_height":600,"thumbnail_url_150":"https:\/\/images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com\/f\/32cd1746-0ab7-4ed2-a468-1688f385ab20\/de186p7-0612edfc-933c-45b0-8833-03ab3a777214.png\/v1\/fit\/w_150,h_150,strp\/lynn_s_first_day_by_sepisnake_de186p7-150.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMjAwIiwicGF0aCI6IlwvZlwvMzJjZDE3NDYtMGFiNy00ZWQyLWE0NjgtMTY4OGYzODVhYjIwXC9kZTE4NnA3LTA2MTJlZGZjLTkzM2MtNDViMC04ODMzLTAzYWIzYTc3NzIxNC5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.GSgi48z5eqJfpcsEt_wWSvL5VnZD6OLO05VfcZ06kFo","thumbnail_url_200h":"https:\/\/images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com\/f\/32cd1746-0ab7-4ed2-a468-1688f385ab20\/de186p7-0612edfc-933c-45b0-8833-03ab3a777214.png\/v1\/fill\/w_100,h_200,strp\/lynn_s_first_day_by_sepisnake_de186p7-200h.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMjAwIiwicGF0aCI6IlwvZlwvMzJjZDE3NDYtMGFiNy00ZWQyLWE0NjgtMTY4OGYzODVhYjIwXC9kZTE4NnA3LTA2MTJlZGZjLTkzM2MtNDViMC04ODMzLTAzYWIzYTc3NzIxNC5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.GSgi48z5eqJfpcsEt_wWSvL5VnZD6OLO05VfcZ06kFo","thumbnail_width_200h":100,"thumbnail_height_200h":200}')

const Save = ( props ) => {
	const {
		attributes: {
			embedUrl,
			embedData: {
				author_name,
				author_url,
				height,
				title,
				url,
				width,
			},
		},
		className,
	} = props;

	if (!props.attributes.embedData.hasOwnProperty('url')) {
		return <div className={className} />
	}

	return (
		<div className={className}>
			<div className="oddevan-deviantart-embed">
				<p className="deviantart-header">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="15"
						height="28"
						viewBox="0 0 100 167"
					>
						<path fill="#00e59b" d="M100 0H71.32l-3.06 3.04-14.59 27.85-4.26 2.46H0v41.62h26.4l2.75 2.75L0 133.36v33.25l28.7-.01 3.07-3.05 14.62-27.86 4.17-2.41H100v-41.6H73.52L70.84 89 100 33.33"></path>
					</svg>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="76"
						height="28"
						viewBox="2 25 68 22"
					>
						<path fill="#ffffff" d="M7.29 42.783l1.07-2.05.5 2.05H7.29zm.1-5.737l-4.89 9.34h2.9l.71-1.36h3.28l.32 1.36h2.9l-2.24-9.34H7.39zm9.79 4.367h-1.24v-1.889h1.24c.76 0 1.04.38 1.04.95 0 .566-.29.936-1.04.939m3.88-.983c0-2.15-1.45-3.38-3.49-3.38h-4.43v9.34h2.79v-2.72H17.17l1.35 2.73h2.9l-1.73-3.3c.86-.55 1.37-1.46 1.37-2.67m.41-3.384v2.476h2.65v6.867h1.59l1.2-2.299v-4.568h2.39l1.3-2.476zm15.66-11.434h2.79v9.342h-2.79v-9.342zm-23.75.005l-1.25 2.4h.77c1.38 0 2.25.88 2.25 2.27 0 1.37-.87 2.25-2.25 2.25h-.87v-4.33l-2.7 5.16v1.59h3.76c3.03 0 4.81-1.83 4.81-4.67-.01-2.757-1.67-4.557-4.52-4.67m5.25 9.337h7.13v-2.476h-4.34v-1.01h3.99v-2.37h-3.99v-1.01h4.34v-2.476h-7.13zm12.1-3.689l-1.36-5.653h-2.9l2.24 9.342h2.98l4.9-9.342h-2.91zm29.64-5.654v2.477h2.64v6.867h1.59l1.21-2.299v-4.568h2.39l1.3-2.477zM45.25 31.35l1.07-2.05.49 2.05h-1.56zm.11-5.738l-4.89 9.34h2.9l.71-1.36h3.27l.32 1.36h2.9l-2.24-9.34h-2.97zm11.62 4.425l-3.12-4.425H51.1v9.342h2.79V30.21l3.47 4.744h2.41v-9.342h-2.79z"></path>
					</svg>
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
					{__(' by ', 'oddevan-deviantart-embed')}
					<a href={author_url}>
						{author_name}
					</a>
				</p>
			</div>
		</div>
	);
};

export default Save;

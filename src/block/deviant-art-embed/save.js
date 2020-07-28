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

	return (
		<div className={className}>
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
		</div>
	);
};

export default Save;

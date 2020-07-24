const { Fragment } = wp.components;

const DeviantArtEmbed = (props) => {
	console.log('Outputting DA Embed', props);
	
	const {
		author_name,
		author_url,
		height,
		title,
		url,
		width,
	} = props.response;

	return (
		<Fragment>
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
		</Fragment>
	);
}

export default DeviantArtEmbed;
# Women in Quantum

Static site for showcasing guests featured on the `Women in Quantum` podcast.

The page includes:

- a portrait gallery for `Women in Quantum`
- guest detail cards with pull quotes, episode info, LinkedIn links, transcripts, YouTube episode links, and infographics

## Files

- `index.html`: page structure
- `styles.css`: visual design and responsive layout
- `data.js`: guest content and asset links
- `app.js`: gallery and feature-card behavior
- `logo.jpg`: Women in Quantum logo
- `Images/`: guest portraits
- `Infograhics/`: local infographics and downloaded transcript files

## Update content

Edit `data.js`. Each guest entry can include:

- `name`
- `role`
- `company`
- `episode`
- `focus`
- `quote`
- `linkedinUrl`
- `imageSrc`
- `transcriptUrl`
- `youtubeEpisodeUrl` for a full-length YouTube episode
- `infographicSrc` or `infographicUrl`

## Asset paths

Use relative paths that match the current folder structure, for example:

- `imageSrc: "Images/jane-doe.jpg"`
- `infographicSrc: "Infograhics/S1E1.png"`

## Preview

Open:

- `file:///C:/Users/Candace/WomeninQuantum/index.html`

## Notes

- Clicking an infographic opens the full-size image in a new tab.
- The main guest data is driven from `data.js`, so most content updates happen in one place.
- Impact Quantum guest records remain in the data file for future use.

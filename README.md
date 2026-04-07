# Women in Quantum

Static site for showcasing guests featured on the `Women in Quantum` podcast.

The page includes:

- a portrait gallery for `Women in Quantum`
- a separate `Impact Quantum` section
- guest detail cards with pull quotes, episode info, LinkedIn links, transcripts, clips, and infographics

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
- `clipSrc` or `clipExternalUrl`
- `infographicSrc` or `infographicUrl`

## Asset paths

Use relative paths that match the current folder structure, for example:

- `imageSrc: "Images/jane-doe.jpg"`
- `clipSrc: "clips/jane-doe-clip.mp4"`
- `infographicSrc: "Infograhics/S1E1.png"`

## Preview

Open:

- `file:///C:/Users/Candace/WomeninQuantum/index.html`

## Notes

- Clicking an infographic opens the full-size image in a new tab.
- The main guest data is driven from `data.js`, so most content updates happen in one place.
- `Impact Quantum` guests are intentionally separated from the core `Women in Quantum` gallery.

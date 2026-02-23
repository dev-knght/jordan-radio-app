# Jordan Radio

A modern, dark-themed web app for listening to live radio stations from Jordan. Built with React, Vite, and Tailwind CSS.

## Features

- Browse curated list of Jordanian radio stations
- One-click playback with bottom-fixed player
- Station details: genre, frequency, language
- Live indicator when a station is playing
- Responsive grid layout (mobile, tablet, desktop)
- Dark mode with green accent theme
- Lebanese-inspired design (clean, minimal)

## Getting Started

1. **Install dependencies:**

```bash
npm install
```

2. **Run the development server:**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Build for production:**

```bash
npm run build
```

4. **Preview production build:**

```bash
npm run preview
```

## Deployment

This app is a static site. You can deploy it to:

- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- Any static hosting service

### Deploy to Vercel

1. Push this project to a GitHub repository.
2. Import the project in Vercel.
3. Use default settings (Build Command: `npm run build`, Output Directory: `dist`).
4. Deploy.

### Deploy to GitHub Pages

1. Update `vite.config.js` to set `base` to your repo name:

```js
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

2. Build and copy `dist` to `docs` folder, then enable GitHub Pages from repo settings.

## Data

Radio station data is stored in `src/data/stations.json`. It includes:

- `name`: Station name
- `genre`: Music/talk genre
- `logo`: URL to station logo
- `frequency`: FM frequency (if applicable)
- `liveUrl`: Direct stream URL
- `language`: Primary broadcast language
- `country`: Always "Jordan"

## Notes

- Stream availability depends on the source. Some streams may be geo-restricted or temporarily offline.
- Frequencies listed are for Amman area, where available.
- The app uses the HTML5 Audio API. CORS policies on stream servers may affect playback in some browsers.

## License

MIT
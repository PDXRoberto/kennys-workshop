# Kenny's Workshop

**[Open the live app](https://kennys-workshop.pdxroberto.chatgpt.site)** · **[View the caregiver guide](output/pdf/Kennys-Workshop-Caregiver-Guide.pdf)**

![Kenny's Workshop illustrated workshop](dist/assets/hero-workshop.jpg)

Kenny's Workshop is a laptop-first progressive web app designed to make technical puzzles, reminiscence, music, and stories welcoming for an older adult. The experience is intentionally calm, respectful, and challenging without feeling clinical or childish.

## Product goals

- Support independent use with large controls and predictable navigation
- Encourage conversation and memory without testing or correcting personal recollections
- Offer meaningful technical challenges based on mechanics, submarines, cars, and motorcycles
- Avoid timers, failure screens, streak pressure, advertisements, and account setup
- Keep progress and preferences private in the browser

## What is included

- Five activity areas with persistent Home, Progress, Favorites, and Settings navigation
- 60 multiple-choice questions across five interest categories
- Six interactive virtual-workshop stations
- 12 reminiscence and conversation prompts
- 15 engineering and transportation fact cards
- Eight original narrated stories with visible transcripts
- Three original songs created specifically for Kenny
- Spoken instructions, adjustable narration speed, scalable text, and reduced motion

## Engineering highlights

- Buildless HTML, CSS, and JavaScript with no runtime framework dependency
- Progressive Web App manifest and service worker for offline access to core activities
- Web Speech API narration with on-screen text equivalents
- On-demand HTML5 audio streaming for the original MP3 recordings
- Browser-local persistence for progress, favorites, and settings
- Responsive layouts tested at standard laptop sizes and 200% zoom
- Keyboard-accessible dialogs, visible focus states, and controls sized for motor accessibility

## Privacy and safety

The app has no account, ads, analytics, camera, or microphone. Progress and Favorites remain in local browser storage unless a caregiver explicitly exports a backup. It is a recreation and reminiscence experience, not a medical assessment or treatment.

## Project structure

```text
dist/                 Production-ready static app
  assets/audio/       Original MP3 recordings
  icons/              PWA icons
output/pdf/            Printable caregiver guide
tools/                 Content validation and PDF-generation scripts
.openai/hosting.json   Hosting configuration
```

## Run locally

Serve `dist/` from a local HTTP server:

```powershell
python -m http.server 4173 --directory dist
```

Then open `http://127.0.0.1:4173` in Microsoft Edge, Chrome, or Firefox.

## Validate

```powershell
node --check dist/app.js
node --check dist/sw.js
node tools/validate-content.js
```

## Browser support

Use a current version of Microsoft Edge, Chrome, or Firefox. Internet Explorer and legacy Edge are not supported. HTTPS or a local HTTP server is required for service-worker installation.

## Media

The three songs and application artwork are included for this project. No commercial music recordings or copyrighted song lyrics are used.


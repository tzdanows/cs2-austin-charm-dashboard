# CS2 Highlights - Austin 2025

A simple Deno webapp displaying CS2 highlight videos from the Austin 2025
tournament.

## Features

- **Dark/Light Mode Toggle**: Located in the top-right corner of the navbar
- **Expandable Sections**: Each match can be expanded to show videos grouped by
  map
- **Video Count Display**: Shows total number of videos for each match
- **Responsive Grid Layout**: 4-column grid (4:3 aspect ratio) that adapts to
  screen size
- **CDN Video Embedding**: Videos are loaded directly from Steam CDN

## Quick Start

```bash
deno task dev
```

Visit http://localhost:8000 to view the webapp.

## Data Structure

Videos are organized by:

- **Match** (e.g., "Faze vs Mongolz")
- **Map** (e.g., "Anubis", "Mirage")
- **Individual highlight videos** with cleaned titles

## Tech Stack

- Deno Fresh 2.0
- Preact with Signals
- Tailwind CSS (manual implementation)
- TypeScript

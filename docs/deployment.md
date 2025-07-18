# Deployment Guide

This Fresh 2.0 Deno app is deployed to Deno Deploy using `deployctl`.

## Live Site

**https://aus2025-charm-rates-w3681e4ajktq.deno.dev**

## Deployment Process

### Prerequisites

1. Install `deployctl` CLI tool:
   ```bash
   deno install -A -r https://deno.land/x/deploy/deployctl.ts
   ```

### Deployment Steps

1. **Build the application** (generates required `_fresh/snapshot.json`):
   ```bash
   deno task build
   ```

2. **Deploy using deployctl**:
   ```bash
   deployctl deploy --project=aus2025-charm-rates --entrypoint=main.ts
   ```

3. **Authentication**: On first deployment, you'll be prompted to authorize via browser at `https://dash.deno.com/signin/cli`

### Project Configuration

The deployment automatically updates `deno.json` with:
```json
{
  "deploy": {
    "project": "c880e3c5-80c2-417f-b7db-0fd35c34bbf4",
    "exclude": ["**/node_modules"],
    "include": [],
    "entrypoint": "main.ts"
  }
}
```

### Architecture Notes

- **Framework**: Fresh 2.0 alpha (server-side rendering)
- **Entry Point**: `main.ts` (production-ready)
- **Assets**: All static files in `/static/` directory are uploaded
- **Build Cache**: `_fresh/` directory contains build artifacts required for production mode

### Previous Attempts

- **GitHub Pages**: Failed due to Fresh being a server-side framework, not static site generation
- **Deno Deploy Dashboard**: Framework presets had build cache issues
- **Solution**: Direct `deployctl` CLI deployment with proper build process

## Local Development

```bash
deno task dev    # Start development server
deno task build  # Build for production
deno task start  # Start production server locally
```

primary reference: 
> https://docs.deno.com/deploy/manual/deployctl/
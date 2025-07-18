#!/usr/bin/env -S deno run -A

import { renderToString } from "npm:preact-render-to-string@^6.5.11";
import { ensureDir } from "jsr:@std/fs";

// Import our page component
import Home from "./routes/index.tsx";

console.log("🚀 Building static HTML...");

// Render the page to HTML
const bodyHtml = renderToString(Home({}));

// Create the full HTML document
const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Austin 2025 CS2 Highlights</title>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    ${bodyHtml}
    <script type="module" src="/_fresh/js/fresh-runtime.js"></script>
  </body>
</html>`;

// Create dist directory
await ensureDir("./dist");

// Write index.html
await Deno.writeTextFile("./dist/index.html", html);
console.log("✅ index.html generated");

// Copy static assets
try {
  await Deno.stat("./static");
  const copyCommand = new Deno.Command("cp", {
    args: ["-r", "./static/.", "./dist/"],
  });
  await copyCommand.output();
  console.log("✅ Static assets copied");
} catch {
  console.log("ℹ️ No static directory found, skipping...");
}

// Copy Fresh assets
try {
  await Deno.stat("./_fresh/static");
  await ensureDir("./dist/_fresh");
  const copyFreshCommand = new Deno.Command("cp", {
    args: ["-r", "./_fresh/static/.", "./dist/"],
  });
  await copyFreshCommand.output();
  console.log("✅ Fresh assets copied");
} catch {
  console.log("ℹ️ No Fresh assets found, skipping...");
}

console.log("🎉 Static site generated in ./dist");
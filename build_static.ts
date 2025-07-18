#!/usr/bin/env -S deno run -A

import { ensureDir } from "jsr:@std/fs";

// Start the Fresh server in background using dev.ts
const server = new Deno.Command("deno", {
  args: ["run", "-A", "dev.ts"],
  stdout: "piped",
  stderr: "piped",
  env: { "PORT": "3000" },
});

const serverProcess = server.spawn();

// Wait longer for server to fully start
console.log("🚀 Starting Fresh server...");
await new Promise(resolve => setTimeout(resolve, 5000));

try {
  // Test if server is ready
  let retries = 0;
  let response;
  while (retries < 10) {
    try {
      response = await fetch("http://localhost:3000/");
      if (response.ok) break;
    } catch {
      console.log(`⏳ Waiting for server... (${retries + 1}/10)`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      retries++;
    }
  }
  
  if (!response || !response.ok) {
    throw new Error("Server failed to start");
  }
  
  console.log("📄 Fetching homepage...");
  console.log("📍 URL:", response.url);
  console.log("📊 Status:", response.status);
  const html = await response.text();
  console.log("📝 HTML preview:", html.substring(0, 200) + "...");
  
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
  
} catch (error) {
  console.error("❌ Error generating static site:", error);
  throw error;
} finally {
  // Kill the server
  console.log("🛑 Stopping server...");
  serverProcess.kill();
  await serverProcess.status;
}
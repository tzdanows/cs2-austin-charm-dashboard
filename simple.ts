import { renderToString } from "npm:preact-render-to-string@^6.5.11";
import data from "./data.json" with { type: "json" };

// Simple server without Fresh complexity
const server = Deno.serve({ port: 8000 }, (req) => {
  const url = new URL(req.url);
  
  // Serve static files
  if (url.pathname.startsWith("/static/") || url.pathname.startsWith("/images/")) {
    return serveStatic(url.pathname);
  }
  
  // Serve main page
  if (url.pathname === "/" || url.pathname === "/index.html") {
    return new Response(generateHTML(), {
      headers: { "content-type": "text/html" },
    });
  }
  
  return new Response("Not found", { status: 404 });
});

function serveStatic(path: string) {
  try {
    const filePath = `.${path}`;
    const file = Deno.readFileSync(filePath);
    const contentType = getContentType(path);
    return new Response(file, {
      headers: { "content-type": contentType },
    });
  } catch {
    return new Response("File not found", { status: 404 });
  }
}

function getContentType(path: string): string {
  if (path.endsWith(".css")) return "text/css";
  if (path.endsWith(".js")) return "text/javascript";
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
  return "text/plain";
}

function generateHTML(): string {
  // Tournament bracket organization
  const tournamentBracket = {
    finals: {
      title: "Finals",
      matches: data.matches.filter((match) =>
        match.name === "Mongolz vs Vitality"
      ),
    },
    semifinals: {
      title: "Semifinals", 
      matches: data.matches.filter((match) =>
        match.name === "Mouz vs Vitality" ||
        match.name === "Mongolz vs Pain"
      ),
    },
    quarterfinals: {
      title: "Quarterfinals",
      matches: data.matches.filter((match) =>
        match.name === "Faze vs Mongolz" ||
        match.name === "Furia vs Pain" ||
        match.name === "Mouz vs Spirit" ||
        match.name === "Navi vs Vitality"
      ),
    },
  };

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Austin 2025 CS2 Highlights</title>
    <link rel="stylesheet" href="/static/styles.css" />
  </head>
  <body>
    <div class="min-h-screen bg-canvas-subtle">
      <nav class="bg-canvas border-b border-default px-8 py-6 shadow-sm">
        <div class="max-w-7xl mx-auto flex-between">
          <div class="flex-center">
            <div class="flex-center">
              <div class="w-10 h-10 bg-canvas-subtle border border-default rounded-lg flex-center mr-3 p-1">
                <img src="/static/images/misc/aus_charm.png" alt="Austin 2025 Charm" class="w-full h-full object-contain"/>
              </div>
              <div>
                <h1 class="text-2xl font-bold text-fg-default">Austin 2025 Souvenir Badge Info</h1>
                <p class="text-fg-muted text-sm">highlight CDNs + estimated drop rates</p>
              </div>
            </div>
          </div>
          <button class="btn-github p-3 rounded-lg flex-center" onclick="toggleTheme()" aria-label="Toggle theme">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
          </button>
        </div>
      </nav>
      
      <main class="max-w-7xl mx-auto px-8 py-8">
        ${Object.values(tournamentBracket).map(stage => `
          <div class="tournament-stage stage-${stage.title.toLowerCase()}">
            <h2>${stage.title}</h2>
            <hr class="tournament-stage-divider">
          </div>
          <div class="stage-matches">
            ${stage.matches.map(match => `
              <div class="match-card mb-6">
                <div class="w-full match-header text-left">
                  <div class="flex-between mb-6">
                    <div>
                      <h3 class="text-2xl font-bold text-fg-default">${match.name}</h3>
                    </div>
                    <div class="flex-center">
                      <span class="total-videos-badge video-count-badge mr-4">${match.maps.reduce((total, map) => total + map.videos.length, 0)} total videos</span>
                    </div>
                  </div>
                  <div class="header-maps-container">
                    <div class="header-maps-grid">
                      ${match.maps.map(map => `
                        <div class="header-map-card">
                          <img src="/static/images/maps/${map.name.toLowerCase()}.jpg" alt="${map.name} map" class="header-map-image"/>
                          <div class="map-name-badge map-${map.name.toLowerCase()}">${map.name} [1/${map.videos.length}]</div>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `).join('')}
      </main>
    </div>
    
    <script>
      function toggleTheme() {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
      }
      
      // Load saved theme
      if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
      }
    </script>
  </body>
</html>`;
}

console.log("🚀 Server running on http://localhost:8000");
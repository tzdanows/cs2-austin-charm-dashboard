import { useSignal } from "@preact/signals";

interface Video {
  title: string;
  url: string;
}

interface Map {
  name: string;
  videos: Video[];
}

interface ExpandableSectionProps {
  match: {
    name: string;
    maps: Map[];
  };
}

export default function ExpandableSection({ match }: ExpandableSectionProps) {
  const isExpanded = useSignal(false);

  const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value;
  };

  const totalVideos = match.maps.reduce(
    (total, map) => total + map.videos.length,
    0,
  );

  // Create array of 3 maps, filling missing slots with specific third maps
  const displayMaps = [...match.maps];

  // Add specific third maps for certain matches
  if (displayMaps.length < 3) {
    let thirdMapName = "TBD";

    if (match.name === "Mongolz vs Pain") {
      thirdMapName = "Nuke";
    } else if (match.name === "Faze vs Mongolz") {
      thirdMapName = "Ancient";
    } else if (match.name === "Navi vs Vitality") {
      thirdMapName = "Inferno";
    }

    displayMaps.push({
      name: thirdMapName,
      videos: [],
    });
  }

  const getMapColorClass = (mapName: string) => {
    return `map-${mapName.toLowerCase()}`;
  };

  const getMapIcon = (mapName: string) => {
    const icons: { [key: string]: string } = {
      anubis: "🏺",
      dust2: "🏜️",
      inferno: "🔥",
      mirage: "🏙️",
      nuke: "☢️",
      train: "🚂",
      ancient: "🏛️",
      tbd: "❓",
    };
    return icons[mapName.toLowerCase()] || "🗺️";
  };

  return (
    <div class="match-card mb-6">
      <button
        onClick={toggleExpanded}
        class="w-full match-header text-left transition-all duration-200"
      >
        {/* Title and Dropdown Arrow */}
        <div class="flex-between mb-6">
          <div>
            <h3 class="text-2xl font-bold text-fg-default">
              {match.name}
            </h3>
          </div>
          <div class="flex-center">
            <span class="total-videos-badge video-count-badge mr-4">
              {totalVideos} total videos
            </span>
            <svg
              class={`w-6 h-6 transform transition-transform ${
                isExpanded.value ? "rotate-180" : ""
              } text-fg-muted`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Centered Map Images and Info */}
        <div class="header-maps-container">
          <div class="header-maps-grid">
            {displayMaps.map((map, index) => (
              <div key={index} class="header-map-card">
                <img
                  src={`/images/maps/${map.name.toLowerCase()}.jpg`}
                  alt={`${map.name} map`}
                  class="header-map-image"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling.style.display = "flex";
                  }}
                />
                <div
                  class="header-map-fallback text-fg-muted"
                  style="display: none;"
                >
                  {getMapIcon(map.name)}
                </div>
                <div class={`map-name-badge ${getMapColorClass(map.name)}`}>
                  {map.name}{" "}
                  [{map.name === "TBD" || map.videos.length === 0 ? "0/0" : `1/${map.videos.length}`}]
                </div>
              </div>
            ))}
          </div>
        </div>
      </button>

      {isExpanded.value && (
        <div class="match-content">
          {/* Video Grid Section - Only for actual maps */}
          {match.maps.map((map) => (
            <div key={map.name} class="mb-8 last:mb-0">
              <div class="flex-between mb-4">
                <h4 class="text-xl font-bold text-fg-default">
                  {map.name} Highlights
                </h4>
                <span class="text-fg-muted">
                  {map.videos.length} videos
                </span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {map.videos.map((video, index) => (
                  <div
                    key={index}
                    class="bg-canvas-subtle border border-border-muted rounded-lg overflow-hidden hover:border-accent hover:shadow-sm transition-all duration-200 group"
                  >
                    <div class="aspect-video bg-black">
                      <video
                        class="w-full h-full"
                        controls
                        preload="metadata"
                        poster=""
                      >
                        <source src={video.url} type="video/webm" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div class="p-3">
                      <p class="text-sm font-medium text-fg-default leading-tight">
                        {video.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

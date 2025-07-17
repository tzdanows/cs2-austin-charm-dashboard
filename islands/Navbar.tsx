import { effect, signal } from "@preact/signals";

const isDark = signal(false);

// Initialize theme from localStorage or system preference
effect(() => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme");
    const systemDark =
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = stored === "dark" || (!stored && systemDark);

    isDark.value = shouldBeDark;
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }
});

export default function Navbar() {
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle("dark", isDark.value);
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
  };

  return (
    <nav class="bg-canvas border-b border-default px-8 py-6 shadow-sm">
      <div class="max-w-7xl mx-auto flex-between">
        <div class="flex-center">
          <div class="flex-center">
            <div class="w-10 h-10 bg-canvas-subtle border border-default rounded-lg flex-center mr-3 p-1">
              <img
                src="/images/misc/aus_charm.png"
                alt="Austin 2025 Charm"
                class="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 class="text-2xl font-bold text-fg-default">
                Austin 2025 Souvenir Badge Info
              </h1>
              <p class="text-fg-muted text-sm">
                highlight CDNs + estimated drop rates
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          class="btn-github p-3 rounded-lg flex-center"
          aria-label="Toggle theme"
        >
          {isDark.value
            ? (
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            )
            : (
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
        </button>
      </div>
    </nav>
  );
}

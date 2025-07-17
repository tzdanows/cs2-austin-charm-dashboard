import { define } from "../utils.ts";
import Navbar from "../islands/Navbar.tsx";
import ExpandableSection from "../islands/ExpandableSection.tsx";
import data from "../data.json" with { type: "json" };

export default define.page(function Home() {
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
        match.name === "Mouz vs Spirit" ||
        match.name === "Navi vs Vitality" ||
        match.name === "Faze vs Mongolz" ||
        match.name === "Furia vs Pain"
      ),
    },
  };

  return (
    <div class="min-h-screen bg-canvas-subtle">
      <Navbar />
      <main class="max-w-7xl mx-auto px-8 py-8">
        {/* Finals */}
        <div class="tournament-stage stage-finals">
          <h2>{tournamentBracket.finals.title}</h2>
          <hr class="tournament-stage-divider" />
        </div>
        <div class="stage-matches">
          {tournamentBracket.finals.matches.map((match, index) => (
            <ExpandableSection key={`finals-${index}`} match={match} />
          ))}
        </div>

        {/* Semifinals */}
        <div class="tournament-stage stage-semifinals">
          <h2>{tournamentBracket.semifinals.title}</h2>
          <hr class="tournament-stage-divider" />
        </div>
        <div class="stage-matches">
          {tournamentBracket.semifinals.matches.map((match, index) => (
            <ExpandableSection key={`semifinals-${index}`} match={match} />
          ))}
        </div>

        {/* Quarterfinals */}
        <div class="tournament-stage stage-quarterfinals">
          <h2>{tournamentBracket.quarterfinals.title}</h2>
          <hr class="tournament-stage-divider" />
        </div>
        <div class="stage-matches">
          {tournamentBracket.quarterfinals.matches.map((match, index) => (
            <ExpandableSection key={`quarterfinals-${index}`} match={match} />
          ))}
        </div>
      </main>
    </div>
  );
});

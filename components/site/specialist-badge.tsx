import type { TeamBadge } from "./data";

export function SpecialistBadge({ badge, compact = false }: { badge: TeamBadge; compact?: boolean }) {
  return (
    <p className={`specialist-badge${compact ? " is-compact" : ""}`}>
      <span className="specialist-seal" aria-hidden="true">
        <span>{badge.mark}</span>
      </span>
      <span className="specialist-badge-copy">
        <span className="specialist-kicker">{badge.kicker}</span>
        <span className="specialist-title">{badge.title}</span>
      </span>
    </p>
  );
}

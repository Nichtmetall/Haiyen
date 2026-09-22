export function SpecialistBadge({ badge, compact = false }: { badge: string; compact?: boolean }) {
  return <p className={`specialist-badge${compact ? " is-compact" : ""}`}>{badge}</p>;
}

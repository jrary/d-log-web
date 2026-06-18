export const gridgeQueryKey = {
  all: () => ["gridge"] as const,
  user: () => [...gridgeQueryKey.all(), "user"] as const,
}

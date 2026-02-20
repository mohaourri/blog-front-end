export function getKeycloak() {
  if (typeof window === 'undefined') return null;
  return (window as any).__keycloak ?? null;
}

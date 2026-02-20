"use client";
import { useEffect, useState } from "react";

export default function KeycloakProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const Keycloak = (await import("keycloak-js")).default;
      const kc = new Keycloak({
        url: "http://localhost:8080",
        realm: "blog-realm",
        clientId: "blog-client-front",
      });
      const auth = await kc.init({
        onLoad: "check-sso",
        checkLoginIframe: false,
        silentCheckSsoFallback: false,
      });
      if (auth) {
        localStorage.setItem("access_token", kc.token!);
      }
      (window as any).__keycloak = kc;
      setReady(true);
    };
    init().catch((err) => {
      console.error("Keycloak init error:", err);
      (window as any).__keycloak = null;
      setReady(true);
    });
  }, []);

  if (!ready) return <p className="text-center mt-10">Chargement...</p>;

  return <>{children}</>;
}

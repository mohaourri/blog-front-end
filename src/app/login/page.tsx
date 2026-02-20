"use client";
import { getKeycloak } from "@/lib/keycloak";

export default function LoginPage() {
  const handleLogin = () => {
    const kc = getKeycloak();
    if (kc) {
      kc.login({ redirectUri: "http://localhost:3000/" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <h1 className="text-3xl font-bold text-gray-800">Bienvenue sur BlogApp</h1>
      <p className="text-gray-500">Connectez-vous pour acceder a votre espace.</p>
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition text-lg"
      >
        Se connecter avec Keycloak
      </button>
    </div>
  );
}

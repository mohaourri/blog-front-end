"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getKeycloak } from "@/lib/keycloak";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export default function Navbar() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const kc = getKeycloak();
    if (kc?.authenticated) {
      setAuthenticated(true);
      setUsername(kc.tokenParsed?.preferred_username ?? "");
      setRoles(kc.tokenParsed?.realm_access?.roles ?? []);
    }
  }, []);

  const isAdmin = roles.includes("ADMIN");
  const isAuthor = roles.includes("AUTHOR");

  const logout = () => {
    localStorage.removeItem("access_token");
    getKeycloak()?.logout({ redirectUri: "http://localhost:3000" });
  };

  return (
    <AppBar position="static" color="inherit" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Typography variant="h6" fontWeight={700} color="primary">BlogApp</Typography>
        </Link>
        <Box display="flex" gap={2} alignItems="center">
          <Link href="/articles" style={{ textDecoration: "none" }}>
            <Button color="inherit">Articles</Button>
          </Link>
          {authenticated && (
            <>
              {(isAuthor || isAdmin) && (
                <Link href="/dashboard/articles" style={{ textDecoration: "none" }}>
                  <Button color="inherit">Mes articles</Button>
                </Link>
              )}
              <Link href="/profile" style={{ textDecoration: "none" }}>
                <Button color="inherit">Profil</Button>
              </Link>
              <Typography variant="body2" color="text.secondary">{username}</Typography>
              <Button color="error" variant="outlined" size="small" onClick={logout}>
                Deconnexion
              </Button>
            </>
          )}
          {!authenticated && (
            <Button variant="contained" onClick={() => getKeycloak()?.login()}>
              Connexion
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
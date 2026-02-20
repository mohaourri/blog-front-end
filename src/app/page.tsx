"use client";
import { Box, Button, Container, Typography, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { getKeycloak } from "@/lib/keycloak";

export default function Home() {
  const router = useRouter();
  const kc = getKeycloak();

  return (
    <Box sx={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#f9fafb" }}>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography variant="h2" fontWeight={700} color="primary" gutterBottom>
          BlogApp
        </Typography>
        <Typography variant="h5" color="text.secondary" mb={4}>
          Decouvrez, partagez et creez des articles passionnants.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" size="large" onClick={() => router.push("/articles")}>
            Voir les articles
          </Button>
          {!kc?.authenticated ? (
            <Button variant="outlined" size="large" onClick={() => kc?.login()}>
              Se connecter
            </Button>
          ) : (
            <Button variant="outlined" size="large" onClick={() => router.push("/dashboard")}>
              Mon Dashboard
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

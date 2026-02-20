"use client";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { articleService } from "@/services/article.service";
import ArticleIcon from "@mui/icons-material/Article";
import { getKeycloak } from "@/lib/keycloak";

export default function DashboardPage() {
  const kc = getKeycloak();
  const username = kc?.tokenParsed?.preferred_username ?? "Utilisateur";

  const { data } = useQuery({
    queryKey: ["articles", 0],
    queryFn: () => articleService.getAll(0, 50),
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={1}>
        Bonjour, {username} 👋
      </Typography>
      <Typography color="text.secondary" mb={4}>
        Bienvenue sur votre tableau de bord.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 3, display: "flex", alignItems: "center", gap: 2, borderRadius: 3 }}>
            <ArticleIcon color="primary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h5" fontWeight={700}>{data?.totalElements ?? 0}</Typography>
              <Typography color="text.secondary">Articles publiés</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
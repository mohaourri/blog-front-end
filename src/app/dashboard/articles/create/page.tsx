"use client";
import { Container, Typography, Box, Button } from "@mui/material";
import ArticleForm from "@/components/article/ArticleForm";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function CreateArticlePage() {
  const router = useRouter();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push("/dashboard/articles")}
          variant="outlined"
        >
          Retour
        </Button>
        <Typography variant="h4" fontWeight={700}>
          Nouvel article
        </Typography>
      </Box>

      <Box p={3} bgcolor="white" borderRadius={3} boxShadow={2}>
        <ArticleForm onSuccess={() => router.push("/dashboard/articles")} />
      </Box>
    </Container>
  );
}

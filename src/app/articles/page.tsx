"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { articleService } from "@/services/article.service";
import ArticleCard from "@/components/article/ArticleCard";
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

export default function DashboardArticlesPage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["articles", 0],
    queryFn: () => articleService.getAll(0, 50),
  });

  const { mutate: deleteArticle } = useMutation({
    mutationFn: (id: number) => articleService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["articles"] }),
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={700}>Mes articles</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push("/dashboard/articles/create")}
        >
          Nouvel article
        </Button>
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center"><CircularProgress /></Box>
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>
          {data?.content.map((a) => (
            <ArticleCard key={a.id} article={a} onDelete={(id) => deleteArticle(id)} />
          ))}
        </Box>
      )}
    </Container>
  );
}
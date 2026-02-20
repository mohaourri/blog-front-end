"use client";
import { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { articleService } from "@/services/article.service";
import { Alert, Box, Button, Chip, CircularProgress, Container, Divider, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArticleForm from "@/components/article/ArticleForm";
import { getKeycloak } from "@/lib/keycloak";

export default function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const articleId = Number(id);
  const [editMode, setEditMode] = useState(false);
  const kc = getKeycloak();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["article", articleId],
    queryFn: () =>
      articleService.getAll(0, 100).then(
        (page) => page.content.find((a) => a.id === articleId) ?? Promise.reject("introuvable")
      ),
  });

  if (isLoading) return <Box display="flex" justifyContent="center" mt={10}><CircularProgress /></Box>;
  if (isError || !data) return <Container maxWidth="md" sx={{ py: 4 }}><Alert severity="error">Article introuvable.</Alert></Container>;

  console.log("authorName:", data.authorName);
  console.log("username:", kc?.tokenParsed?.preferred_username);
  console.log("sub (keycloak_id):", kc?.tokenParsed?.sub);

  const isAuthor = kc?.authenticated === true;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {editMode ? (
        <Box>
          <Typography variant="h5" fontWeight={700} mb={3}>Modifier larticle</Typography>
          <ArticleForm initial={data} onSuccess={() => setEditMode(false)} />
          <Button sx={{ mt: 2 }} onClick={() => setEditMode(false)}>Annuler</Button>
        </Box>
      ) : (
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Typography variant="h3" fontWeight={700}>{data.title}</Typography>
            {isAuthor && (
              <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setEditMode(true)}>
                Modifier
              </Button>
            )}
          </Box>
          <Box display="flex" gap={1} alignItems="center" mb={3}>
            <Chip label={data.authorName} color="primary" size="small" />
            <Typography variant="caption" color="text.secondary">
              {new Date(data.createdAt).toLocaleDateString("fr-FR")}
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body1" lineHeight={1.8} whiteSpace="pre-wrap">
            {data.content}
          </Typography>
        </Box>
      )}
    </Container>
  );
}

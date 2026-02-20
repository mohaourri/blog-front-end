"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { articleService } from "@/services/article.service";
import { ArticleRequest, ArticleResponse } from "@/types/article.types";
import { Alert, Box, Button, CircularProgress, TextField, Typography } from "@mui/material";

interface Props {
  initial?: ArticleResponse;
  onSuccess?: () => void;
}

export default function ArticleForm({ initial, onSuccess }: Props) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ArticleRequest>({
    defaultValues: { title: initial?.title ?? "", content: initial?.content ?? "" },
  });

  useEffect(() => {
    if (initial) reset({ title: initial.title, content: initial.content });
  }, [initial, reset]);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (dto: ArticleRequest) =>
      initial ? articleService.update(initial.id, dto) : articleService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      onSuccess?.();
    },
  });

  return (
    <Box component="form" onSubmit={handleSubmit((data) => mutate(data))} display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6" fontWeight={600}>
        {initial ? "Modifier larticle" : "Nouvel article"}
      </Typography>
      <TextField
        label="Titre"
        fullWidth
        {...register("title", { required: "Titre obligatoire", minLength: { value: 3, message: "Min 3 caracteres" } })}
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      <TextField
        label="Contenu"
        fullWidth
        multiline
        rows={6}
        {...register("content", { required: "Contenu obligatoire", minLength: { value: 10, message: "Min 10 caracteres" } })}
        error={!!errors.content}
        helperText={errors.content?.message}
      />
      {isError && <Alert severity="error">Erreur lors de la sauvegarde.</Alert>}
      <Button type="submit" variant="contained" disabled={isPending} size="large">
        {isPending ? <CircularProgress size={24} /> : initial ? "Mettre a jour" : "Publier"}
      </Button>
    </Box>
  );
}

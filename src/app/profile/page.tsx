"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { userService } from "@/services/user.service";
import { UserProfileRequest } from "@/types/article.types";
import { Alert, Avatar, Box, Button, CircularProgress, Container, Divider, TextField, Typography } from "@mui/material";
import { useEffect } from "react";

export default function ProfilePage() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: () => userService.getMyProfile(),
  });

  const { register, handleSubmit, reset } = useForm<UserProfileRequest>();

  useEffect(() => {
    if (data) reset({ bio: data.bio ?? "", avatarUrl: data.avatarUrl ?? "" });
  }, [data, reset]);

  const { mutate, isPending, isError: isMutateError, isSuccess } = useMutation({
    mutationFn: (dto: UserProfileRequest) => userService.completeProfile(dto),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
  });

  if (isLoading) return <Box display="flex" justifyContent="center" mt={10}><CircularProgress /></Box>;
  if (isError) return <Container sx={{ py: 4 }}><Alert severity="error">Erreur de chargement du profil.</Alert></Container>;

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
        <Avatar src={data?.avatarUrl} sx={{ width: 100, height: 100, mb: 2, fontSize: 40 }}>
          {data?.firstName?.[0]}
        </Avatar>
        <Typography variant="h5" fontWeight={700}>{data?.firstName} {data?.lastName}</Typography>
        <Typography color="text.secondary">@{data?.username}</Typography>
        <Typography color="text.secondary" fontSize={14}>{data?.email}</Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" fontWeight={600} mb={2}>Completer mon profil</Typography>

      <Box component="form" onSubmit={handleSubmit((d) => mutate(d))} display="flex" flexDirection="column" gap={2}>
        <TextField label="Bio" fullWidth multiline rows={3} {...register("bio")} placeholder="Parlez-nous de vous..." />
        <TextField label="URL de avatar" fullWidth {...register("avatarUrl")} placeholder="https://..." />

        {isMutateError && <Alert severity="error">Erreur lors de la mise a jour.</Alert>}
        {isSuccess && <Alert severity="success">Profil mis a jour avec succes !</Alert>}

        <Button type="submit" variant="contained" size="large" disabled={isPending}>
          {isPending ? <CircularProgress size={24} /> : "Enregistrer"}
        </Button>
      </Box>
    </Container>
  );
}
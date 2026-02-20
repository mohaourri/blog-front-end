# 📝 Blog Frontend

Interface web d'un blog fullstack construite avec **Next.js 16**, **React 19**, **MUI**, **React Query**, et **NextAuth v5** (Keycloak).

---
<img width="1905" height="796" alt="{54FF176A-BF9D-430E-A097-97C9D5FCBDD0}" src="https://github.com/user-attachments/assets/0cdf9c79-f3ab-469f-a573-a6b7f5940fdb" />
<img width="1911" height="915" alt="{6D5DC77C-399B-4F37-A56D-68D6237441BB}" src="https://github.com/user-attachments/assets/b7e374c0-cf77-4054-a5b2-dce2b9473789" />
<img width="1919" height="904" alt="{AFA28C2D-EB7C-403E-A301-04B6A03F4255}" src="https://github.com/user-attachments/assets/93516fde-8d08-4076-99aa-0b1c7be8a579" />
<img width="1914" height="910" alt="{9B42A232-63BC-4BAE-8A77-A1D77206F625}" src="https://github.com/user-attachments/assets/e99d5112-569a-4792-a537-a32f7d477a94" />
<img width="1915" height="908" alt="{BF698601-4BB0-4A38-840C-931C31333A6E}" src="https://github.com/user-attachments/assets/773bfbce-21ed-4bf5-9b35-dadbaa2e8d83" />


## 🧱 Stack technique

| Technologie | Rôle |
|---|---|
| Next.js 16 (App Router) | Framework React SSR/CSR |
| React 19 | UI |
| TypeScript | Typage statique |
| Material UI (MUI) v6 | Composants UI + thème |
| Axios | Client HTTP |
| @tanstack/react-query v5 | Gestion état serveur + cache |
| React Hook Form | Gestion formulaires + validation |
| NextAuth v5 (beta) | Authentification OAuth2 |
| Keycloak | Fournisseur d'identité (IdP) |

---

## 🔗 Backend associé

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend Spring Boot | http://localhost:8089/api/v1 |
| Keycloak | http://localhost:8080/realms/blog-realm |

---

## 📁 Architecture du projet

```
blog-frontend/
├── src/
│   ├── app/
│   │   ├── api/auth/[...nextauth]/   # Endpoint NextAuth (Keycloak callback)
│   │   ├── articles/                 # Liste, détail, recherche articles
│   │   ├── dashboard/                # Gestion articles (CRUD)
│   │   ├── login/                    # Page de connexion
│   │   ├── profile/                  # Profil utilisateur
│   │   ├── layout.tsx                # Layout racine (Providers)
│   │   └── page.tsx                  # Page d'accueil
│   ├── components/
│   │   ├── article/
│   │   │   ├── ArticleCard.tsx       # Carte article (MUI Card)
│   │   │   └── ArticleForm.tsx       # Formulaire (RHF + MUI + useMutation)
│   │   ├── comment/
│   │   │   ├── CommentForm.tsx       # Formulaire commentaire (MUI TextField)
│   │   │   └── CommentList.tsx       # Liste commentaires (MUI List)
│   │   ├── layout/
│   │   │   ├── Navbar.tsx            # MUI AppBar + état session
│   │   │   ├── Footer.tsx            # Pied de page
│   │   │   └── Providers.tsx         # SessionProvider + QueryClient + ThemeProvider
│   │   └── ui/
│   │       ├── Button.tsx            # Bouton MUI réutilisable
│   │       └── Input.tsx             # Input MUI réutilisable
│   ├── lib/
│   │   ├── api.ts                    # Instance Axios + intercepteur JWT
│   │   ├── auth.ts                   # Configuration NextAuth + Keycloak
│   │   ├── react-query.ts            # Configuration QueryClient
│   │   └── theme.ts                  # Thème MUI personnalisé
│   ├── services/
│   │   ├── article.service.ts        # Appels HTTP /articles
│   │   ├── comment.service.ts        # Appels HTTP /comments
│   │   └── user.service.ts           # Appels HTTP /users
│   └── types/
│       ├── article.types.ts          # Interfaces Article
│       ├── comment.types.ts          # Interfaces Comment
│       ├── user.types.ts             # Interfaces User
│       └── next-auth.d.ts            # Extension types Session NextAuth
├── .env.local
├── next.config.ts
├── tsconfig.json
└── package.json
```

---


### 3. Configurer `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8089/api/v1

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=une_chaine_secrete_longue

KEYCLOAK_CLIENT_ID=blog-client
KEYCLOAK_CLIENT_SECRET=
KEYCLOAK_ISSUER=http://localhost:8080/realms/blog-realm
```

### 4. Lancer

```bash
npm run dev
```

---

## 🎨 MUI — Utilisation

### Thème `src/lib/theme.ts`

```typescript
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});
```

### Intégration dans `Providers.tsx`

```tsx
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "@/lib/theme";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
```

### Composants MUI utilisés

| Composant MUI | Utilisé dans |
|---|---|
| `AppBar` / `Toolbar` | Navbar |
| `Card` / `CardContent` | ArticleCard |
| `TextField` | ArticleForm, CommentForm |
| `Button` | Partout |
| `Typography` | Titres et textes |
| `CircularProgress` | États de chargement |
| `Alert` | Messages d'erreur |
| `List` / `ListItem` | CommentList |
| `Avatar` | Profil utilisateur |
| `Pagination` | Liste articles |

### Exemple — ArticleForm avec MUI + React Hook Form

```tsx
import { TextField, Button, Box } from "@mui/material";
import { useForm } from "react-hook-form";

export default function ArticleForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Titre"
        error={!!errors.title}
        helperText={errors.title?.message as string}
        {...register("title", { required: "Le titre est obligatoire" })}
      />
      <TextField
        label="Contenu"
        multiline
        rows={6}
        error={!!errors.content}
        helperText={errors.content?.message as string}
        {...register("content", { required: "Le contenu est obligatoire" })}
      />
      <Button type="submit" variant="contained">Publier</Button>
    </Box>
  );
}
```

---

## 🔐 Authentification — Flux Keycloak

```
1. Clic "Se connecter"
        ↓
2. signIn("keycloak") → redirection Keycloak
        ↓
3. Saisie identifiants sur Keycloak
        ↓
4. Callback NextAuth : /api/auth/callback/keycloak
        ↓
5. Session créée + JWT stocké
        ↓
6. Axios injecte : Authorization: Bearer <token>
        ↓
7. Spring Boot valide et répond
```

### Configuration Keycloak requise

```
Realm             → blog-realm
Client            → blog-client
Access Type       → public
Valid Redirect    → http://localhost:3000/*
Web Origins       → http://localhost:3000
```

---

## 🔄 React Query — Stratégie de cache

```typescript
// Lecture avec cache par page
const { data, isLoading } = useQuery({
  queryKey: ["articles", page],
  queryFn: () => articleService.getAll(page),
  placeholderData: (prev) => prev,
});

// Mutation avec invalidation automatique
const { mutate } = useMutation({
  mutationFn: (dto) => articleService.create(dto),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["articles"] });
  },
});
```

---

## 🛣️ Routes

| Route | Description | Auth |
|---|---|---|
| `/` | Accueil | Non |
| `/login` | Connexion Keycloak | Non |
| `/articles` | Liste paginée | Non |
| `/articles/[id]` | Détail + commentaires | Non |
| `/articles/search` | Recherche | Non |
| `/dashboard` | Tableau de bord | Oui |
| `/dashboard/articles` | CRUD articles | Oui |
| `/profile` | Profil utilisateur | Oui |

---



## 👤 Auteur

Projet réalisé avec Next.js 16 + Spring Boot + Keycloak + MUI.

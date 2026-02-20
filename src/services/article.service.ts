import { api } from '@/lib/api';
import { ArticleRequest, ArticleResponse, PageResponse } from '@/types/article.types';

export const articleService = {
  getAll: (page = 0, size = 5): Promise<PageResponse<ArticleResponse>> =>
    api.get('/articles', { params: { page, size } }).then((r) => r.data),

  getById: (id: number): Promise<ArticleResponse> =>
    api.get('/articles/' + id).then((r) => r.data),

  search: (keyword?: string, authorId?: number, page = 0, size = 5): Promise<PageResponse<ArticleResponse>> =>
    api.get('/articles/search', { params: { keyword, authorId, page, size } }).then((r) => r.data),

  getByTitle: (title: string): Promise<ArticleResponse> =>
    api.get('/articles/by-title', { params: { title } }).then((r) => r.data),

  create: (dto: ArticleRequest): Promise<ArticleResponse> =>
    api.post('/articles', dto).then((r) => r.data),

  update: (id: number, dto: ArticleRequest): Promise<ArticleResponse> =>
    api.put('/articles/' + id, dto).then((r) => r.data),

  delete: (id: number): Promise<void> =>
    api.delete('/articles/' + id).then(() => {}),
};

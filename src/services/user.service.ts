import { api } from '@/lib/api';
import { UserProfileRequest, UserProfileResponse } from '@/types/article.types';

export const userService = {
  getMyProfile: (): Promise<UserProfileResponse> =>
    api.get('/users/profile').then((r) => r.data),

  completeProfile: (dto: UserProfileRequest): Promise<UserProfileResponse> =>
    api.put('/users/profile/complete', dto).then((r) => r.data),
};
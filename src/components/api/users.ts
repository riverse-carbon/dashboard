import type { User } from 'components/types/user';
import { request } from './request';

type GetUserRes = {
  user: User;
};

export function getUser(): Promise<GetUserRes> {
  return request({
    method: 'GET',
    url: '/v1/users/me',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}


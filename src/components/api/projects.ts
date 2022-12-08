import { request } from './request';

export function getProjects() {
  return request({
    method: 'GET',
    url: '/api/protected/projects',
  });
}

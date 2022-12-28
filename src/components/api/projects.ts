import { request } from './request';

export function getProjects() {
  return request({
    method: 'GET',
    url: '/v1/projects',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function getProjectById(project_id: number) {
  return request({
    method: 'GET',
    url: `/v1/projects/${project_id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

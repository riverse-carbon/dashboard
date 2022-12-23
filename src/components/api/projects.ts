import { request } from './request';

export function getProjects() {
  return request({
    method: 'GET',
    url: '/v1/airtable/projects',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

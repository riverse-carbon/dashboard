import { request } from './request';

export function getProjects() {
  return request({
    method: 'GET',
    url: 'http://localhost:4242/v1/airtable/projects',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

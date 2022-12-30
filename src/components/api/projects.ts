import type { Project, ProjectRaw } from 'components/types/project';
import { request } from './request';

type GetProjectsRes = {
  projects: Project[];
};

export function getProjects(): Promise<GetProjectsRes> {
  return request({
    method: 'GET',
    url: '/v1/projects',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

type GetProjectsByIdRes = {
  project: ProjectRaw;
};
export function getProjectById(project_id: number): Promise<GetProjectsByIdRes> {
  return request({
    method: 'GET',
    url: `/v1/projects/${project_id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

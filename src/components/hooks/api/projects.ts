import { useQuery } from '@tanstack/react-query';

import { getProjects, getProjectById } from 'components/api/projects';

export const projects_keys = {
  projects: ['projects'] as const,
  getProjects: () => [...projects_keys.projects, 'all'] as const,
  getProjectById: (project_id: number) => [...projects_keys.projects, project_id] as const,
};

export const useProjects = () =>
  useQuery(projects_keys.getProjects(), async () => {
    const res = await getProjects();

    return res.projects;
  });

export const useProjectById = (project_id: number, enabled?: boolean) =>
  useQuery(projects_keys.getProjectById(project_id), async () => {
    const res = await getProjectById(project_id);

    return res.project;
  }, {
    enabled,
  });

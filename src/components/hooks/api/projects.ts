import { useQuery } from '@tanstack/react-query';

import { getProjects } from 'components/api/projects';

export const projects_keys = {
  projects: ['projects'] as const,
  getProjects: () => [...projects_keys.projects, 'all'] as const,
  getProjectById: (id: string) => [...projects_keys.projects, id] as const,
};

export const useProjects = () =>
  useQuery(projects_keys.getProjects(), async () => {
    const res = await getProjects();

    return res.data;
  });

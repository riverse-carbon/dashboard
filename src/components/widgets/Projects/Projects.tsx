import { useCallback, useMemo } from 'react';

import { useProjects } from 'components/hooks/api/projects';

import ProjectNode from './ProjectNode';

import type { AppliedFilters } from 'components/types/filters';
import { Project } from 'components/types/project';

// QUESTION: useState or this way?
// TODO: add priceRange to the table

type ProjectProps = {
  limit?: number;
  withFilters?: boolean;
  appliedFilters?: AppliedFilters;
};

const Projects = ({ limit = 100, withFilters = false, appliedFilters = {} }: ProjectProps): JSX.Element => {
  const { data, isError, isLoading } = useProjects();

  const projectsWithoutFilters = useMemo(() => {
    if (data) {
      return data?.slice(0, limit).map(project => <ProjectNode key={project.id} project={project} />);
    }
    return [];
  }, [data, limit]);

  const title = withFilters ? 'Available carbon credits' : 'Contributed projects';

  const noProjectsMsg = withFilters ? 'No project correspond to applied filters' : 'No project found';

  const applyFiltersToProjects = useCallback((filters: AppliedFilters, elements: JSX.Element[]) => {
    // no filters => get all elements back
    if (Object.keys(filters).length === 0) {
      return elements;
    }
    // for each element:
    return elements.filter(element => {
      const { project }: { project: Project } = element.props;

      // get the element back only if element pass EVERY filter:
      return Object.keys(filters).every(key => {
        // if filter is not an array with at least 1 value => filter passes
        if (!Array.isArray(filters[key])) {
          return true;
        }
        if (filters[key]?.length === 0) {
          return true;
        }

        // add priceRange to the project's values before uncommenting this
        // if (key === 'priceRange') {
        //   const filterMin = filters[key]![0]!;
        //   const filterMax = filters[key]![1]!;
        //   const projectMin = project[key][0];
        //   const projectMax = project[key][1];

        //   const inRange = projectMin <= filterMax && projectMax >= filterMin;
        //   return inRange;
        // }

        // if at least 1 value of filters values is present in element data (aka project) => filter passes
        return filters[key]!.some(value => {
          const projectValues = project[key as keyof typeof project];

          if (!(key in project)) {
            return false;
          }
          // if project's value is an array of values => check if filter is inside this array
          if (Array.isArray(projectValues) && projectValues.length !== 0) {
            return projectValues.some(val => val == value);
          }
          // if project's value is a string/number => check if filter's value equals project's value
          return projectValues == value;
        });
      });
    });
  }, []);

  if (isError) {
    return <>An error has occurred. Contact us if the problem persists</>;
  }

  if (isLoading && !data) {
    return (
      <h2>
        {title}
        <br />
        Loading...
      </h2>
    );
  }

  const shownProjects: JSX.Element[] = withFilters
    ? applyFiltersToProjects(appliedFilters, projectsWithoutFilters)
    : projectsWithoutFilters;

  return (
    <>
      <h2 className='text-xl'>{title}</h2>
      <div>
        <ul role='list' className='flex flex-col gap-5'>
          {shownProjects.length !== 0 ? shownProjects : noProjectsMsg}
        </ul>
      </div>
    </>
  );
};

export default Projects;

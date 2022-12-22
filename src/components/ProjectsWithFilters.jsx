import { useProjects } from 'components/hooks/api/projects';

import ProjectNode from './ProjectWithFiltersNode';
import styles from '../styles/Projects.module.css';

// TODO:
// 1. maxRecords 100 is enough?
// 2. check if strict comparison is better ?

function ProjectsWithFilters({ limit = 100, appliedFilters }) {
  const { data, isError, isLoading } = useProjects();

  if (isError) {
    return <>An error has occurred. Contact us if the problem persists</>;
  }

  if (isLoading && !data) {
    return (
      <h2>
        Loading <span className='sr-only'>all projects</span>...
      </h2>
    );
  }
  const projects = data?.slice(0, limit).map(project => <ProjectNode key={project.id} data={project.fields} />);
  const filtered_projects = projects.filter(project => {
    const { data } = project.props;

    return Object.keys(appliedFilters).every(key => {
      if (appliedFilters[key].length === 0) {
        return true;
      }
      if (key === 'priceRange') {
        const filterMin = +appliedFilters[key][0];
        const filterMax = +appliedFilters[key][1];
        const projectMin = +data[key][0];
        const projectMax = +data[key][1];

        const inRange = projectMin <= filterMax && projectMax >= filterMin;
        return inRange;
      }
      return appliedFilters[key].some(value => {
        if (Array.isArray(data[key])) {
          return data[key].includes(value);
        }
        return data[key] == value;
      });
    });
  });

  return (
    <>
      <h2>Available carbon credits</h2>
      <div className={styles['list-wrapper']}>
        <ul role='list' className='list'>
          { filtered_projects.length !== 0
            ?
            filtered_projects
            :
            <h4>No project correspond to applied filters</h4>
          }
        </ul>
      </div>
    </>
  );
}

export default ProjectsWithFilters;

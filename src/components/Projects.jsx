import { useProjects } from 'components/hooks/api/projects';
import styles from 'styles/Projects.module.css';

import ProjectNode from './ProjectNode';

const Projects = ({ limit = 100 }) => {
  const { data, isError, isLoading } = useProjects();

  if (isError) {
    return <>An error has occurred. Contact us if the problem persists</>;
  }

  if (isLoading && !data) {
    return (
      <h2>
        Contributed projects
        <br />
        Loading...
      </h2>
    );
  }
  const projects = data?.slice(0, limit).map(project => <ProjectNode key={project.id} project={project} />);

  return (
    <>
      <h2>Contributed projects</h2>
      <div className={styles['list-wrapper']}>
        {projects && projects.length > 0 ? (
          <ul role='list' className='list'>
            {projects}
          </ul>
        ) : (
          <p>No projects found</p>
        )}
      </div>
    </>
  );
};

export default Projects;

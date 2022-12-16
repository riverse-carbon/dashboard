import { useAuth0 } from '@auth0/auth0-react';
import { useProjects } from 'components/hooks/api/projects';
import { useEffect } from 'react';

import styles from 'styles/Projects.module.css';

import ProjectNode from './ProjectNode';

// TODO: maxRecords 100 is enough?

const Projects = ({ limit = 100 }) => {
  const { getAccessTokenSilently } = useAuth0();
  const { data, isError, isLoading } = useProjects();

  useEffect(() => {
    async function testAccessToken() {
      const accessToken = await getAccessTokenSilently({
        audience: 'http://localhost:4242',
      });

      console.log('ACCESS TOKEN !');
      console.log(accessToken);
    }
    testAccessToken();
  }, [getAccessTokenSilently]);

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
  const projects = data?.slice(0, limit).map(project => <ProjectNode key={project.id} data={project.fields} />);

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

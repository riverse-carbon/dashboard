import { useState, useEffect } from 'react';
import useSWR from 'swr';

import styles from 'styles/Projects.module.css'

import ProjectNode from './ProjectNode';

// TODO: maxRecords 100 is enough?

const Projects = ({ limit = 100 }) => {
  const fetcher = url => fetch(url).then(res => res.json());
  const API = '/api/protected/projects';
  const { data, error } = useSWR(API, fetcher);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (data && !data.error) {
      const projectsList = data.data
        .slice(0, limit)
        .map(project => <ProjectNode key={project.id} data={project.fields} />)
      setProjects(projectsList)
    }
  }, [data, limit]);

  if (error) {
    return <>An error has occurred. Contact us if the problem persists</>;
  }

  if (data && data.error) {
    return <>{data.error}. Contact us if the problem persists</>;
  }

  if (!data) {
    return (
      <h2>
        Contributed projects
        <br />
        Loading...
      </h2>
    );
  }

  return (
    <>
      <h2>Contributed projects</h2>
      <div className={styles['list-wrapper']}>
        <ul role='list' className='list'>
          {projects}
        </ul>
      </div>
    </>
  );
}

export default Projects;

import { useState, useEffect } from 'react';

import styles from 'styles/Documentation.module.css';

import { documentationPages } from '../../../../db';
import PostPreviewCard from '../../PostPreviewCard';
// TODO: use static generation and dynamic data for posts

function Documentation() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsList = documentationPages.posts.map((post, i) => <PostPreviewCard key={i} data={post} />);
    setPosts(postsList);
  }, []);

  return (
    <>
      <h2>Documentation</h2>
      <div className={styles['list-wrapper']}>
        <ul role='list' className='list'>
          {posts}
        </ul>
      </div>
    </>
  );
}

export default Documentation;

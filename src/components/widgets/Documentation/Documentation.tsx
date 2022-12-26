import { useState, useEffect } from 'react';
import DOC_POSTS from './data';
import PostPreviewCard from './PostPreviewCard';

// TODO: use static generation and dynamic data for posts

function Documentation(): JSX.Element {
  const [posts, setPosts] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const postsList = DOC_POSTS.map((post, i) => <PostPreviewCard key={i} data={post} />);
    setPosts(postsList);
  }, []);

  return (
    <>
      <h2 className='text-xl'>Documentation</h2>
      <ul role='list' className='grid gap-x-14 gap-y-7 grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))]'>
        {posts}
      </ul>
    </>
  );
}

export default Documentation;

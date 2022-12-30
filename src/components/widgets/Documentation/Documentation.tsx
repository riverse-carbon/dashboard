import DOC_POSTS from './data';
import PostPreviewCard from './PostPreviewCard';

// TODO: use static generation and dynamic data for posts

function Documentation(): JSX.Element {
  const postsList = DOC_POSTS.map((post, i) => <PostPreviewCard key={i} data={post} />);

  return (
    <>
      <h2 className='text-xl'>Documentation</h2>
      {/* responsive columns: grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] */}
      <ul role='list' className='grid gap-14 justify-evenly grid-cols-[repeat(2,minmax(16rem,_25rem))]'>
        {postsList}
      </ul>
    </>
  );
}

export default Documentation;

import Image from 'next/future/image';
import type { Post } from './data';

import Button from 'components/Button';

// TODO: leave or delete shadow on image

const PostPreviewCard = ({ data }: { data: Post }): JSX.Element => {
  return (
    <li className='flex flex-col gap-2'>
      <Image className='shadow-low h-52 object-cover rounded-xl' src={data.thumbnail} alt='' sizes='20rem' />
      <h4 className='text-base leading-tight font-normal'>{data.title}</h4>
      <p>{data.previewText}</p>
      <Button href={data.link} type='external' label='Read more' additionalStyles='mx-auto mt-auto'>
        <span className='sr-only'>about {data.title}</span>
      </Button>
    </li>
  );
};

export default PostPreviewCard;

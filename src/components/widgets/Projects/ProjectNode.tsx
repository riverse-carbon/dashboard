import Image from 'next/future/image';
import Link from 'next/link';

import type { Project } from 'components/types/project';

// TODO:
// 1. replace fakeData with a real one
// 2. add <a> + passHref and fix accessibility issues
// 5. contribution => available credits
// 6. total => price

const fakeData = {
  total: 432,
  contribution: 345.3,
};

type ProjectNodeProps = {
  project: Project;
};

function ProjectNode({ project }: ProjectNodeProps): JSX.Element {
  const { cover_picture, name, tagline, location, id } = project;
  const { total, contribution } = fakeData;

  return (
    <Link href={`/projects/${id}`}>
      <li className='grid group grid-flow-col grid-cols-[4.75rem_1fr] gap-2.5 min-h-[4.75rem] cursor-pointer'>
        <div className='relative'>
          <Link href={`/projects/${id}`}>
            <a className='grid group/link place-items-center text-base font-medium text-primary bg-bg h-full w-full grid-flow-col no-underline rounded-xl'>
              <Image
                src={cover_picture}
                alt=''
                fill
                sizes='8rem'
                className='object-cover group-focus/link:opacity-0 group-hover:opacity-0 motion-safe:transition-all rounded-xl'
              />
              Details<span aria-hidden='true'>&gt;</span>
              <span className='sr-only'> on {name} project</span>
            </a>
          </Link>
        </div>
        <div className='grid grid-cols-[auto_max-content] gap-2.5 py-2.5 px-4 bg-bg-secondary group-hover:bg-primary-400 motion-safe:transition-all rounded-xl'>
          <div className='max-w-sm flex flex-col justify-between'>
            <h3 className='text-base leading-[1.05] font-medium group-hover:underline motion-safe:transition-all'>
              {tagline}
            </h3>
            <span className='text-text-secondary'>Location: {location}</span>
          </div>
          <div className='flex justify-center items-center gap-2.5'>
            <p className='flex flex-column flex-block-center'>
              <span>Carbon credits</span>
              <span className='bg-bg py-1.5 px-4 rounded-lg'>{`${contribution} tCO2`}</span>
            </p>
            <p className='flex flex-column flex-block-center'>
              <span>Value</span>
              <span className='bg-bg py-1.5 px-4 rounded-lg'>{`${total} €`}</span>
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
}

export default ProjectNode;

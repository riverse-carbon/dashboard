import { useContext } from 'react';
import Image from 'next/future/image';

import { CartSVG } from 'components/icons';
import { handleModalOpen, ModalId } from 'components/ModalDialog';
import MarkdownComponent from './markdown';
import type { Project } from 'components/types/project';

// TODO:
// 1. check sizes on image attribute
// 3. limit text height + "read more" button on solution
// 8. main max-width ?
// 9. Why undefined type on images and cover? Added optional chaining and fallback value as an empty string for Image source

const SeparateProject = ({ project }: { project: Project }) => {
  const modalId = useContext(ModalId);
  const cover = project.cover[0];
  const { images } = project;

  const sdgs =
    project.sdgsArray &&
    project.sdgsArray.map((sdg, i) => {
      const { url, width, height } = sdg.icon;
      return (
        <li className='grid gap-sm grid-cols-[5.625rem_1fr]' key={i}>
          <div>
            <Image src={url} alt='' width={width} height={height} />
          </div>
          {sdg.desc}
        </li>
      );
    });

  const cccp = project.cccp.map((principle, i) => (
    <li className=' grid grid-cols-[4rem_1fr] gap-md items-start' key={i}>
      <span className='font-serif text-2xl text-center font-medium p-sm border-2 border-primary-300 rounded'>
        0{i + 1}
      </span>
      <div className='space-y-sm'>
        <h3 className='text-xl'>{principle.name}</h3>
        <p>{principle.value}</p>
      </div>
    </li>
  ));

  // const carousel = project.carouselImg.map(img =>)
  const carousel = project.images[2];

  const keyImpact = project.keyImpact.map((impact, i) => (
    <li className='flex flex-col gap-sm items-center text-center' key={i}>
      <Image
        src={impact.icon.url}
        width={impact.icon.width || 64}
        height={impact.icon.height || 64}
        alt=''
        className='h-16 w-auto'
      />
      <span className='font-serif font-bold text-xl text-green tracking-[0.04em]'>{impact.figure}</span>
      <span>{impact.desc}</span>
    </li>
  ));

  const handleBuyCredits = () => {
    handleModalOpen(modalId);
  };

  return (
    <>
      <div className='space-y-md'>
        <div className='p-md shadow-medium rounded relative min-h-[max(10rem,25vh)]'>
          <Image
            className='object-cover rounded'
            src={cover?.url || ''}
            alt=''
            fill={true}
            sizes='70vw'
            priority={true}
          />
        </div>
        <section className='flow-spacer spacer-xs p-md shadow-medium rounded'>
          <h1 className='text-3xl'>{project.tagline}</h1>
          <p>Developer: {project.name}</p>
          <p>Sector: {project.sectors.join(', ')}</p>
        </section>
        <section className='grid gap-md grid-cols-[1fr_12rem] p-md shadow-medium rounded'>
          <div className='space-y-md'>
            <h2 className='text-2xl'>The solution</h2>
            <MarkdownComponent text={project.solution} className='font-serif' />
          </div>
          <div className='self-center'>
            <Image
              className='object-cover rounded h-[12rem]'
              src={images[0]?.url || ''}
              alt=''
              width='250'
              height='250'
            />
          </div>
        </section>
        <section className='p-md shadow-medium rounded space-y-md'>
          <h2 className=' text-2xl'>Key impacts</h2>
          <ul role='list' className='grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] justify-around gap-sm'>
            {keyImpact}
          </ul>
        </section>
        <div className=' p-md shadow-medium rounded min-h-[max(10rem,25vh)] relative overflow-hidden'>
          <Image className='object-cover' alt='' src={carousel?.url || ''} fill={true} sizes='70vw' />
        </div>
        <section className='grid gap-md grid-cols-[1fr_12rem] p-md shadow-medium rounded'>
          <div className='space-y-md'>
            <h2 className='text-2xl'>The issue</h2>
            <p className='font-serif'>{project.issue}</p>
          </div>
          <div className='self-center'>
            <Image
              className='object-cover rounded h-[12rem]'
              src={images[1]?.url || ''}
              alt=''
              width='250'
              height='250'
            />
          </div>
        </section>
        <section className='p-md shadow-medium rounded space-y-md'>
          <h2 className='text-2xl'>Sustainable development goals</h2>
          <ul role='list' className='grid gap-md grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]'>
            {sdgs}
          </ul>
        </section>
        <section className='p-md shadow-medium rounded space-y-md'>
          <h2 className='text-2xl'>Core carbon principles</h2>
          <ul role='list' className='grid gap-md grid-cols-2'>
            {cccp}
          </ul>
        </section>
        <section className='p-md shadow-medium rounded text-center'>
          <h2 className='sr-only text-2xl '>Time to take actions</h2>
          <button onClick={handleBuyCredits} className='link-with-icon link-with-icon--centered max-w-max mx-auto'>
            <CartSVG />
            Buy carbon credits
          </button>
        </section>
      </div>
    </>
  );
};

export default SeparateProject;

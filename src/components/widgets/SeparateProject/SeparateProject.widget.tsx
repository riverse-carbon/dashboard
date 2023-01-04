import { useContext } from 'react';
import Image from 'next/future/image';

import { CartSVG } from 'components/icons';
import { handleModalOpen, ModalId } from 'components/ModalDialog';
import MarkdownComponent from './markdown';
import type { Project } from 'components/types/project.d';

// TODO:
// 1. check sizes on image attribute
// 3. limit text height + "read more" button on solution
// 8. main max-width ?
// 9. Why undefined type on images and cover? Added optional chaining and fallback value as an empty string for Image source

const SeparateProject = ({ project }: { project: Project }) => {
  const modalId = useContext(ModalId);
  const { images } = project;

  const sdgs =
    project.sdgsArray &&
    project.sdgsArray.map((sdg, i) => {
      const { url, width, height } = sdg.icon;
      return (
        <li className='grid gap-2.5 grid-cols-[5.625rem_1fr]' key={i}>
          <div>
            <Image src={url} alt='' width={width} height={height} />
          </div>
          {sdg.desc}
        </li>
      );
    });

  const cccp = project.cccp.map((principle, i) => (
    <li className=' grid grid-cols-[4rem_1fr] gap-5 items-start' key={i}>
      <span className='font-serif text-2xl text-center font-medium p-2.5 border-2 border-bg-secondary rounded-xl-xl'>
        0{i + 1}
      </span>
      <div className='space-y-2.5'>
        <h3 className='text-xl'>{principle.name}</h3>
        <p>{principle.value}</p>
      </div>
    </li>
  ));

  // TODO: const carousel = project.carouselImg.map(img =>)
  const carousel = project.images[2];

  const keyImpact = project.keyImpact.map((impact, i) => (
    <li className='flex flex-col gap-2.5 items-center text-center' key={i}>
      <Image
        src={impact.icon.url}
        width={impact.icon.width || 64}
        height={impact.icon.height || 64}
        alt=''
        className='h-16 w-auto'
      />
      <span className='font-serif text-xl text-green tracking-[0.04em]'>{impact.figure}</span>
      <span>{impact.desc}</span>
    </li>
  ));

  const handleBuyCredits = () => {
    handleModalOpen(modalId);
  };

  return (
    <>
      <div className='p-5 shadow-medium rounded-xl relative min-h-[max(10rem,25vh)]'>
        <Image
          className='object-cover rounded-xl'
          src={project.cover_picture}
          alt=''
          fill={true}
          sizes='70vw'
          priority={true}
        />
      </div>
      <section className='space-y-5 bg-primary-100 rounded-xl p-5 shadow-medium text-base'>
        <section className='space-y-2.5 mb-24 text-xl font-medium'>
          <h1 className='text-3xl pb-3.5'>{project.tagline}</h1>
          <p>Developer: {project.name}</p>
          <p className='opacity-80'>Sector: {project.sectors.join(', ')}</p>
        </section>
        <section className='space-y-5 p-5 shadow-medium rounded-xl'>
          <div className='space-y-5'>
            <h2 className='text-2xl'>The solution</h2>
            <MarkdownComponent text={project.solution} className='font-serif' />
          </div>
          <div className='relative h-[12rem]'>
            <Image className='object-cover rounded-xl' src={images[0]?.url || ''} alt='' fill={true} sizes='70vw' />
          </div>
        </section>
        <section className='p-5 shadow-medium rounded-xl space-y-5'>
          <h2 className='text-2xl'>Key impacts</h2>
          <ul role='list' className='grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] justify-around gap-2.5'>
            {keyImpact}
          </ul>
        </section>
        <div className=' p-5 shadow-medium rounded-xl min-h-[max(10rem,25vh)] relative overflow-hidden'>
          <Image className='object-cover' alt='' src={carousel?.url || ''} fill={true} sizes='70vw' />
        </div>
        <section className='grid gap-5 grid-cols-[1fr_12rem] p-5 shadow-medium rounded-xl'>
          <div className='space-y-5'>
            <h2 className='text-2xl'>The issue</h2>
            <p className='font-serif'>{project.issue}</p>
          </div>
          <div className='self-center'>
            <Image
              className='object-cover rounded-xl h-[12rem]'
              src={images[1]?.url || ''}
              alt=''
              width='250'
              height='250'
            />
          </div>
        </section>
        <section className='p-5 shadow-medium rounded-xl space-y-5'>
          <h2 className='text-2xl'>Sustainable development goals</h2>
          <ul role='list' className='grid gap-5 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]'>
            {sdgs}
          </ul>
        </section>
        <section className='p-5 shadow-medium rounded-xl space-y-5'>
          <h2 className='text-2xl'>Core carbon principles</h2>
          <ul role='list' className='grid gap-5 grid-cols-2'>
            {cccp}
          </ul>
        </section>
        <section className='p-5 shadow-medium rounded-xl text-center'>
          <h2 className='sr-only text-2xl '>Time to take actions</h2>
          <button onClick={handleBuyCredits} className='link-with-icon link-with-icon--centered max-w-max mx-auto'>
            <CartSVG />
            Buy carbon credits
          </button>
        </section>
      </section>
    </>
  );
};

export default SeparateProject;

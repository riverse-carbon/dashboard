import { useAuth0 } from '@auth0/auth0-react';
import Button from 'components/Button';
import dayjs from 'dayjs';
import Image from 'next/future/image';
import heroImg from '../../../public/home-hero.jpg';

type HeroProps = {
  total: number;
};

const Hero = ({ total }: HeroProps): JSX.Element => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  // const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const today = dayjs().format('D MMMM YYYY');
  return (
    <>
      <section className='relative max-h-screen min-h-[max(27rem,40vh)] p-5 grid grid-rows-3 gap-5 '>
        <Image
          src={heroImg}
          fill
          sizes='(max-width: 1100px) 1000px, 95vw'
          alt=''
          priority
          className='object-cover rounded-xl shadow-medium'
        />
        <div className='py-7 px-8 relative max-w-xl row-start-2 justify-self-center'>
          <div className='absolute bg-primary-100 inset-0 opacity-90 rounded-xl'></div>
          <p className='flex gap-10 relative'>
            <span className='text-right'>
              <span className='text-3xl font-serif block mb-2'>Total tons of carbon dioxide removed</span>
              <span className='uppercase font-medium'>Data for {today}</span>
            </span>
            <span className='min-h-full w-0 border-l-2 border-primary'></span>
            <span className='self-center'>
              <span className='text-6xl block font-serif'>{total}</span>
              <span className='text-xl'>tons CO2</span>
            </span>
          </p>
        </div>
        {isAuthenticated ? null : (
          <div className='relative row-start-3 ml-auto rounded-xl bg-primary-700 text-primary-100 p-5 self-end'>
            <p className='grid grid-rows-[fit-content_1fr] grid-cols-[fit-content_1fr] gap-y-2.5 gap-x-5'>
              <>
                <span className='text-xl col-span-2 text-center font-medium'>Welcome!</span>
                <Button
                  label='Log in'
                  onClick={() => void loginWithRedirect()}
                  additionalStyles='bg-primary-100 text-primary border-primary-100 hover:bg-primary hover:text-primary-100'
                />
                <span className='max-w-[25ch]'>You need to Log In to see your dashboard and buy Carbon Credits</span>
              </>
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default Hero;
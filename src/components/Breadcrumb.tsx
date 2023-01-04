import Link from 'next/link';
import { useRouter } from 'next/router';

type BreadcrumbProps = {
  labels: string[];
};

const Breadcrumb = ({ labels }: BreadcrumbProps) => {
  const currentPath = useRouter().asPath;

  // match parts of the string between slashes (so the last bit of current path is not included in the match)
  const splitPath: string[] = currentPath.match(/\/.+?(?=\/)/g) || [];

  // compose whole path for every element in the array
  const breadcrumbWithoutLast = splitPath.reduce((arr, curr) => {
    const lastItem = arr[arr.length - 1] || '';
    arr.push(lastItem + curr);
    return arr;
  }, [] as string[]);

  if (breadcrumbWithoutLast.length + 1 !== labels.length) {
    return <p className='text-xl'>LABELS LIST DOES NOT CORRESPOND TO BREADCRUMB LIST. Check labels quantity!</p>;
  }

  const elementsWithoutLast = breadcrumbWithoutLast.map((element, i) => (
    <li
      key={element}
      className='relative after:absolute after:w-px after:ml-5 after:left-full after:top-[.125em] after:bottom-[.125em] after:border-r-2 after:rotate-[25deg] after:border-primary'>
      <Link href={`${element}`}>
        <a>{`${labels[i]!} `}</a>
      </Link>
    </li>
  ));

  const lastElement = (
    <li>
      <Link href={currentPath}>
        <a aria-current='page'>{labels[labels.length - 1]}</a>
      </Link>
    </li>
  );

  return (
    <nav aria-label='Breadcrumb'>
      <ol role='list' className='text-base flex gap-10 mt-[-1.5em] mb-2.5'>
        {elementsWithoutLast}
        {lastElement}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

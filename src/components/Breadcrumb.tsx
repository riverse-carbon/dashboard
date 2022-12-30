import Link from 'next/link';
import { useRouter } from 'next/router';

type BreadcrumbProps = {
  labels: string[];
};

const Breadcrumb = ({ labels }: BreadcrumbProps) => {
  const pathsWithoutLast = [];
  const labelsWithoutLast = [];
  const lastElement = { path: '', label: '' };
  const currentPath = useRouter().asPath;
  // if (typeof labels === 'string') {
  //   const splitPath = currentPath.split('/');
  //   // populate last element object
  //   lastElement.label = labels
  //   lastElement.path = splitPath.pop() || ''

  //   // do not add the first element which is an empty string
  //   splitPath.forEach((path,i) => {
  //     if (i === 0) {
  //       return
  //     }
  //     pathsWithoutLast.push(path);
  //     labelsWithoutLast.push(path.charAt(0)+path.slice(1))
  //   })
  // }

  const splitPath = currentPath.split('/');

  // const lastElement: LinkNode = links.pop();
  // const elementsBeforeLastElement = paths.map(element => (
  //   <li
  //     key={element}
  //     className='relative after:absolute after:w-px after:ml-5 after:left-full after:top-[.125em] after:bottom-[.125em] after:border-r-2 after:rotate-[25deg] after:border-primary'>
  //     <Link href={`/${element}`}>{`${link.label} `}</Link>
  //   </li>
  // ));

  return (
    <nav aria-label='Breadcrumb'>
      <ol role='list' className='text-base flex gap-10 mt-[-1.5em] mb-2.5'>
        {/* {elementsBeforeLastElement}
        <li>
          <Link href={lastElement.relativePath}>
            <a aria-current='page'>{lastElement.label}</a>
          </Link>
        </li>{' '} */}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

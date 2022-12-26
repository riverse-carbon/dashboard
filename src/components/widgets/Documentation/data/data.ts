import post1image from './1.png';
import post2image from './2.jpg';
import post3image from './3.png';
import post4image from './4.jpeg';

export type Post = {
  title: string;
  previewText: string;
  date: string;
  author: string;
  link: string;
  thumbnail: string;
};

const DOC_POSTS: Post[] = [
  {
    title: 'Riverse standard rules',
    previewText:
      'Here you should fine a lot of answers to the questions you might have on the standard. You will find guidelines and process descriptions.',
    date: 'July 26, 2022',
    author: 'Grégoire Guirauden',
    link: 'https://hubs.ly/Q01ncgNw0',
    thumbnail: post1image,
  },
  {
    title: 'Registry',
    previewText: 'Our registry is the validation system for credit issuance/cancellation and property transfer',
    date: 'July 10, 2022',
    author: 'Grégoire Guirauden',
    link: 'https://www.riverse.io/standard/registry',
    thumbnail: post2image,
  },
  {
    title: 'Carbon credit standards - Eligibility criteria comparison',
    previewText: 'Comparison of main carbon credits standard eligibility criterias',
    date: 'September 29, 2022',
    author: 'Grégoire Guirauden',
    link: 'https://www.riverse.io/blog/carbon-credit-standards-eligibility-criteria-comparison',
    thumbnail: post3image,
  },
  {
    title: 'Methodology',
    previewText: 'Introduction to the methodological framework',
    date: 'September 26, 2022',
    author: 'Grégoire Guirauden',
    link: 'https://www.riverse.io/standard/lca-rules',
    thumbnail: post4image,
  },
];

export default DOC_POSTS;

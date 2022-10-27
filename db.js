import profile from './public/profilePlaceholder.min.png'
import projectImgPlaceholder from './public/projectImgPlaceholder.jpg'

const data = {
  user: {
    email: 'anton.beg@riv.io',
    firstName: 'Anton',
    lastName: 'Begun',
    photo: profile
  },
  projects: [
    {
      id: 1,

      name: 'Project 1',
      desc: 'Secondary Text',
      total: 432,
      contribution: 345.3,
      sdgs: [1, 2, 3],
      orders: [1, 2, 3],
      mechanism: 'reduction',
      sectors: ['sector1', 'sector2'],
      country: 'France',
      price: 50,
      vintageYear: [2021, 2022],
      descLong: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet possimus voluptas molestias labore repellat voluptatum qui. Obcaecati quasi debitis cumque.`,
      transactions: [1, 2, 3],
      img: projectImgPlaceholder
    },
    {
      id: 2,
      name: 'Project 2',
      desc: 'Secondary Text',
      total: 134,
      contribution: 1345.3,
      sdgs: [1, 2, 3],
      orders: [1, 2, 3],
      mechanism: 'reduction',
      sectors: ['sector1', 'sector2'],
      country: 'France',
      price: 50,
      vintageYear: [2021, 2022, 2023],
      descLong: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet possimus voluptas molestias labore repellat voluptatum qui. Obcaecati quasi debitis cumque.`,
      transactions: [1, 2, 3],
      img: projectImgPlaceholder
    },
    {
      id: 3,
      name: 'Project 3',
      desc: 'Secondary Text',
      total: 18620,
      contribution: 45.3,
      sdgs: [1, 2, 3],
      orders: [1, 2, 3],
      mechanism: 'avoidance',
      sectors: ['sector1', 'sector2'],
      country: 'France',
      price: 50,
      vintageYear: [2021, 2022, 2023],
      descLong: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet possimus voluptas molestias labore repellat voluptatum qui. Obcaecati quasi debitis cumque.`,
      transactions: [1, 2, 3],
      img: projectImgPlaceholder
    }
  ],
  sdgs: [
    {
      id: 1,
      name: 'No poverty',
      img:
        'https://dl.airtable.com/.attachments/6a8486a63851d87cfd7cd10c53b997e5/f2d55b78/sdg1-poverty.png'
    },
    {
      id: 2,
      name: 'Zero hunger',
      img:
        'https://dl.airtable.com/.attachments/3f5d202cb0fb74a4aeb62550c247e7d6/a1aa5268/sdg2-hunger.png'
    },
    {
      id: 3,
      name: 'Good health and well-being',
      img:
        'https://dl.airtable.com/.attachments/684e3b225445cf76143bb935d6db935f/393493d6/sdg3-health.png'
    }
  ]
}

export default data

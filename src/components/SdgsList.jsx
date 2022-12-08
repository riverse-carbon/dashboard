import Image from 'next/future/image';

function uniqueSdgsFromProjects(projects) {
  const uniqueSdgs = new Set();
  projects.map(project => {
    project.sdgs.forEach(sdg => {
      uniqueSdgs.add(sdg);
    });
  });
  return uniqueSdgs;
}

function SdgsList({ sdgs, projects }) {
  const sdgsToShow = uniqueSdgsFromProjects(projects);
  const array = sdgs.filter(sdg => sdgsToShow.has(sdg.id));
  return (
    <ul className='list' role='list'>
      {array.map(sdg => (
        <li key={sdg.id}>
          <Image src={sdg.img} alt={sdg.name} width={80} height={80} />
        </li>
      ))}
    </ul>
  );
}

export default SdgsList;

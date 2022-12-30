import { Organisation } from './organisation';

export type Img = {
  width: number;
  height: number;
  url: string;
};

export type Sdg = {
  icon: Img;
  desc: string;
};

type Cccp = {
  name: string;
  value: string;
};

type KeyImpact = {
  desc: string;
  figure: string;
  icon: Img;
};

export type Project = {
  cover_picture: string;
  sdgsArray: Sdg[];
  images: Img[];
  cccp: Cccp[];
  keyImpact: KeyImpact[];
  tagline: string;
  name: string;
  sectors: string[];
  solution: string;
  issue: string;
  years?: string[];
};

export type ProjectWithId = {
  id: string;
  fields: Project;
};

export type ProjectRaw = Pick<
  Project,
  'cover_picture' | 'images' | 'tagline' | 'sectors' | 'solution' | 'issue' | 'years'
> & {
  'sdgs-description': Sdg['desc'][];
  'sdgs-icons': Sdg['icon'][];
  impactDesc: KeyImpact['desc'][];
  impactFigures: KeyImpact['figure'][];
  impactIcons: KeyImpact['icon'][];
  'cccp-unicity': Cccp['value'];
  'cccp-permanence': Cccp['value'];
  'cccp-measurability': Cccp['value'];
  'cccp-additionality': Cccp['value'];
  'cccp-rebound-effects': Cccp['value'];
  organisation: Organisation;
};

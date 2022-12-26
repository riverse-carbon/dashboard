type Img = {
  width: number;
  height: number;
  url: string;
};

type Sdg = {
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
  cover: Img[];
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

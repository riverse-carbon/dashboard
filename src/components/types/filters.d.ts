export type Filter = {
  name: string;
  label: string;
  values: string[] | number[];
};

export type AppliedFilters = {
  [name: string]: Array<string | number>;
};

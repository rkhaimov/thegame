export type Graph = Map<number, GNode>;

export type GNode = {
  color?: string;
  neighbors: number[];
};

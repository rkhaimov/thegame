export type Graph = Map<number, NodeMeta>;

export type NodeMeta = {
  neighbors: number[];
};

import { print } from './print';
import { GNode, Graph } from './types';
import { assert } from './utils';

const graph: Graph = new Map<number, GNode>();

graph.set(0, { neighbors: [1, 2] });
graph.set(1, { neighbors: [] });
graph.set(2, { neighbors: [1] });

function paint(graph: Graph, colors: string[]) {
  const links = new Map<number, Set<number>>();

  for (const [knode] of graph.entries()) {
    sdeep(graph, knode, links);
  }

  for (const [knode, neighbors] of links.entries()) {
    const node = getNode(graph, knode);

    const acolor = getAllowedColor(graph, neighbors, colors);

    node.color = acolor;
  }

  return graph;
}

function sdeep(
  graph: Graph,
  knode: number,
  links: Map<number, Set<number>>,
  nvisited = new Set<number>(),
  parent?: number,
) {
  const node = getNode(graph, knode);

  if (links.has(knode) === false) {
    links.set(knode, new Set(node.neighbors));
  }

  if (parent !== undefined) {
    links.get(knode)!.add(parent);
  }

  if (nvisited.has(knode)) {
    return;
  }

  nvisited.add(knode);

  node.neighbors.forEach(kneighbor => sdeep(graph, kneighbor, links, nvisited, knode));
}

function getAllowedColor(graph: Graph, neighbors: Set<number>, colors: string[]) {
  const acolor = colors.find(color => {
    const taken = Array.from(neighbors).some(kneighbor => getNode(graph, kneighbor).color === color);

    return taken === false;
  });

  assert(acolor !== undefined);

  return acolor;
}

function getNode(graph: Graph, key: number) {
  const node = graph.get(key);

  assert(node !== undefined);

  return node;
}

const colors = ['red', 'green', 'blue', 'yellow', 'brown'];

print(paint(graph, colors))

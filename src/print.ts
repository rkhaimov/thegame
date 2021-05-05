import * as vis from 'vis-network';
import { assert } from './utils';
import { Graph } from './types';

export function print(graph: Graph) {
  const entries = Array.from(graph.keys());

  const nodes = entries
    .map((key): vis.Node => {
      const node = graph.get(key);

      assert(node !== undefined);

      return { id: key, label: `${key}`, ...node };
    });

  const edges = entries
    .reduce((accumulated, key) => {
      const node = graph.get(key);

      assert(node !== undefined);

      const links = node.neighbors.map((sibling): vis.Edge => ({ from: key, to: sibling }));

      return [...accumulated, ...links];
    }, [] as vis.Edge[]);

  document.body.style.height = '100vh';
  document.body.style.width = '100vw';

  const network = new vis.Network(document.body, {
    nodes,
    edges
  }, {});
}

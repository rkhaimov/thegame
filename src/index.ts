import { print } from './print';
import { NodeMeta, Graph } from './types';

let from = 0;
function getNext() {
  from += 1;

  return from;
}

const graph: Graph = new Map<number, NodeMeta>();

for (let i = 0; i <= 10; i += 1) {
  const first = getNext();
  const second = getNext();
  const third = getNext();

  graph.set(i, { neighbors: [first, second, third] });
  graph.set(first, { neighbors: [] });
  graph.set(second, { neighbors: [] });
  graph.set(third, { neighbors: [] });
}

print(graph);
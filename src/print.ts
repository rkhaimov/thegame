import { Graph, NodeMeta } from './types';
import { NodeComponent } from './NodeComponent';
import { NodeEdge } from './NodeEdge';
import { getPosition } from './getPosition';

document.body.innerHTML =
  '<canvas id="myCanvas" width="800" height="700" style="border:1px solid #000000;display: block;margin: 0 auto;"></canvas>';

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;

export function print(graph: Graph) {
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const from = {
    x: (800 - 100) / 2,
    y: (700 + 100) / 2,
  };

  drawNodes(ctx, from, [0, graph.get(0)!], graph, new Map());
}

function drawNodes(
  ctx: CanvasRenderingContext2D,
  nodePosition: { x: number; y: number },
  [node, meta]: [number, NodeMeta],
  graph: Graph,
  drawn: DrawnNodes,
) {
  if (drawn.has(node) && drawn.get(node)!.children) {
    return;
  }

  meta.neighbors.forEach((neighbor, index) => {
    const neighborPosition = getPosition(index, meta.neighbors.length, nodePosition, neighbor, drawn);

    NodeEdge({
      ctx,
      from: nodePosition,
      to: neighborPosition,
    });

    NodeComponent({
      ctx,
      node: neighbor,
      on: neighborPosition,
      drawn,
    });
  });

  NodeComponent({ ctx, on: nodePosition, node, drawn });

  drawn.get(node)!.children = true;

  meta.neighbors.forEach((neighbor, index) => {
    drawNodes(ctx, drawn.get(neighbor)!.on, [neighbor, graph.get(neighbor)!], graph, drawn);
  });
}

export type DrawnNodes = Map<number, { on: { x: number; y: number }, children: boolean }>;

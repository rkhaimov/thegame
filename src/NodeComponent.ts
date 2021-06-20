import { DrawnNodes } from './print';

type NodeComponentProps = {
  ctx: CanvasRenderingContext2D;
  on: { x: number; y: number };
  node: number;
  drawn: DrawnNodes;
};

export function NodeComponent({ ctx, node, on, drawn }: NodeComponentProps) {
  if (drawn.has(node)) {
    return;
  }

  const nodeRadius = 25;

  ctx.beginPath();

  ctx.arc(on.x, on.y, nodeRadius, 0, 2 * Math.PI);
  ctx.fillStyle = '#004db2';
  ctx.fill();

  ctx.font = '30px Arial';
  ctx.fillStyle = '#ffffff';

  ctx.fillText(
    `${node}`,
    on.x - ctx.measureText(`${node}`).width / 2,
    on.y + ctx.measureText(`${node}`).actualBoundingBoxAscent / 2
  );

  ctx.closePath();

  drawn.set(node, { on, children: false });
}
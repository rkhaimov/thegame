type NodeEdgeProps = {
  ctx: CanvasRenderingContext2D;
  from: { x: number; y: number };
  to: { x: number; y: number };
};

export function NodeEdge({ ctx, from, to }: NodeEdgeProps) {
  ctx.beginPath();

  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);

  ctx.stroke();

  ctx.closePath();
}
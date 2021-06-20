import { DrawnNodes } from './print';

export function getPosition(
  index: number,
  total: number,
  from: { x: number; y: number },
  node: number,
  drawn: DrawnNodes,
) {
  if (drawn.has(node)) {
    return drawn.get(node)!.on;
  }

  const predicted = fromAngle(index, total, from);

  const intersect = Array.from(drawn.values()).some((positions) => {
    const x = positions.on.x - predicted.x;
    const y = positions.on.y - predicted.y;
    const distance = Math.sqrt(x * x + y * y);

    return distance <= 25;
  });

  if (intersect) {
    return fromAngle(index + 1, total, from);
  }

  return predicted;
}

function fromAngle(
  index: number,
  total: number,
  from: { x: number; y: number },
) {
  const edgeLength = 100;
  const angle = locations[index % locations.length];

  return {
    x: from.x + Math.cos(angle) * edgeLength,
    y: from.y - Math.sin(angle) * edgeLength,
  };
}

const locations = [
  0,
  ...allFor(4),
  ...allFor(8),
];

function allFor(n: number) {
  const result: number[] = [];

  for (let k = 1; k < n; k += 1) {
    result.push((k / n) * 2 * Math.PI);
  }

  return result;
}

import { Point } from './Point';
import { assert } from './utils';

export function morphInTo(from: SVGPathElement, to: SVGPathElement) {
  from.getAttribute('d');

  for (const joined of getPointsMoves(from, to)) {
  }
}

export function getPointsMoves(from: Shape, to: Shape) {
  const fromPath = parsePath(from.getAttribute('d'));
  const toPath = parsePath(to.getAttribute('d'));

  return fromPath.reduce((accumulated, _, index) => {
    accumulated.push({
      from: {
        point: new Point(fromPath[index].position, noop),
        type: fromPath[index].type,
      },
      to: {
        point: new Point(toPath[index].position, noop),
        type: toPath[index].type,
      },
    });

    return accumulated;
  }, [] as TransformationMeta[]);
}

function parsePath(path: string | null): PathPoint[] {
  assert(path !== null);

  const match = path.match(/[A-Z]+\d+ \d+/g);

  assert(match !== null);

  return match.map((point) => {
    const [x, y] = point.slice(1).split(' ');

    return {
      type: point[0],
      position: {
        x: parseInt(x, 10),
        y: parseInt(y, 10),
      },
    };
  });
}

function noop() {}

export type Shape = {
  getAttribute(qualifiedName: string): string | null;
};

type PathPoint = {
  type: string;
  position: Point['position'];
};

type TransformationMeta = {
  from: {
    type: string;
    point: Point;
  };
  to: {
    type: string;
    point: Point;
  };
};

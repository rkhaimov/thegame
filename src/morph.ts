import { moveInALine } from './moves';
import { Point } from './Point';
import { assert } from './utils';

export function morphInTo(from: SVGShape, to: Shape, onEnd: () => void) {
  const moves = getPointsMoves(from, to);
  const change = interpolate(0, 1, 1_000);

  requestAnimationFrame(update);

  function update() {
    change.perform();

    if (change.complete()) {
      onEnd();

      return;
    }

    for (const move of moves) {
      moveInALine(move.from.point, move.to.point, change.current);
    }

    const path = moves.map((move) => `${move.type}${move.from.point.position.x} ${move.from.point.position.y}`).join(' ');

    from.setAttribute('d', `${path} Z`);

    requestAnimationFrame(update);
  }
}

export function getPointsMoves(from: Shape, to: Shape) {
  const fromPath = parsePath(from.getAttribute('d'));
  const toPath = parsePath(to.getAttribute('d'));
  const diff = toPath.length - fromPath.length;

  if (diff > 0) {
    equalize(diff, fromPath);
  }

  if (diff < 0) {
    equalize(diff * -1, toPath);
  }

  return buildTransformations(fromPath, toPath);
}

function equalize(diff: number, toFill: ReturnType<typeof parsePath>) {
  assert(diff > 0);

  for (let index = 0; index < diff; index += 1) {
    toFill.push({ type: 'L', position: toFill[toFill.length - 1].position });
  }
}

function parsePath(path: string | null): PathPoint[] {
  assertPathIsValid(path);

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

function assertPathIsValid(path: string | null): asserts path is string {
  assert(path !== null, 'Path is null');
  assert(path[0] === 'M', 'Path is not starting by M');
  assert(path[path.length - 1] === 'Z', 'Path is not ending by Z');

  const types = new Set(path.slice(1, path.length - 1).match(/[A-Z]+/g));

  assert(
    types.size === 1 && types.has('L'),
    `Path contains unknown chars ${types}. Should consist only of L's`
  );
}

function buildTransformations(fromPath: PathPoint[], toPath: PathPoint[]) {
  assert(fromPath.length === toPath.length);

  return fromPath.reduce((accumulated, _, index) => {
    assert(toPath[index].type === fromPath[index].type)

    accumulated.push({
      type: toPath[index].type,
      from: {
        point: new Point(fromPath[index].position),
      },
      to: {
        point: new Point(toPath[index].position),
      },
    });

    return accumulated;
  }, [] as TransformationMeta[]);
}

type SVGShape = Shape & {
  setAttribute(qualifiedName: string, attr: string): unknown;
}

export type Shape = {
  getAttribute(qualifiedName: string): string | null;
};

type PathPoint = {
  type: string;
  position: Point['position'];
};

type TransformationMeta = {
  type: string;
  from: {
    point: Point;
  };
  to: {
    point: Point;
  };
};

export function interpolate(from: number, to: number, time: number) {
  const FRAME_TIME = 10;
  const diff = (to - from) / (time / FRAME_TIME);

  return {
    current: 0,
    complete() {
      return parseFloat(this.current.toFixed(5)) === to;
    },
    perform() {
      this.current += diff;
    },
  };
}
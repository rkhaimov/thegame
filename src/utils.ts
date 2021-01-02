import { Point } from './Point';

export function assertNotUndefined<T>(
  value: T
): asserts value is NonNullable<T> {
  assert(value !== undefined);
}

function assert(
  condition: any,
  message = 'Condition is false'
): asserts condition {
  if (condition === false) {
    throw new Error(message);
  }
}

export function sequenceLoop(
  points: Point[],
  index: number,
  animation: (from: Point, to: Point, onEnd: () => void) => void
) {
  const next = (index + 1) % points.length;

  assertNotUndefined(points[next]);

  animation(points[index], points[next], () =>
    sequenceLoop(points, next, animation)
  );
}

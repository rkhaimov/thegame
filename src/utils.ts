import { Point } from './Point';

export function assertNotUndefined<T>(
  value: T
): asserts value is NonNullable<T> {
  assert(value !== undefined);
}

export function assert(
  condition: any,
  message = 'Condition is false',
  onError = noop,
): asserts condition {
  if (condition === false) {
    onError();

    throw new AssertionError(message);
  }
}

class AssertionError extends Error {
  constructor(message: string) {
    super(`Assertion has failed: ${message}`);
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

function noop() {

}

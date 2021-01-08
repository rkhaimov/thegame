import { Point } from './Point';
import { assert } from './utils';

export function moveInALine(from: Point, to: Point, progress: number) {
  assert(0 <= progress && progress <= 1, 'Progress is out of interval');

  const origin = from.position;
  const radius = from.getDistanceFrom(to);
  const angle = from.getAngleBetween(to);

  from.move(getCurrentPosition());

  function getCurrentPosition() {
    return {
      x: Math.cos(angle) * radius * progress + origin.x,
      y: Math.sin(angle) * radius * progress + origin.y,
    };
  }
}

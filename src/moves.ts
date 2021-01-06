import { Point } from './Point';

export function moveInALine(from: Point, to: Point) {
  const origin = from.position;
  const radius = from.getDistanceFrom(to);
  const angle = from.getAngleBetween(to);

  const change = getChange(0, 1, 500);

  requestAnimationFrame(update);

  function update() {
    if (change.complete()) {
      return;
    }

    change.perform();

    from.move(getCurrentPosition());

    requestAnimationFrame(update);
  }

  function getCurrentPosition() {
    return {
      x: Math.cos(angle) * change.current * radius + origin.x,
      y: Math.sin(angle) * change.current * radius + origin.y,
    };
  }
}

function getChange(from: number, to: number, time: number) {
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

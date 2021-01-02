import { Point } from './Point';

export function moveInALine(from: Point, to: Point, onEnd: () => void) {
  const radius = from.getDistanceFrom(to);
  const angle = from.getAngleBetween(to);

  const change = getChange(0, 1, 500);

  const point = new Point(getCurrentPosition());

  const node = point.render();

  requestAnimationFrame(update);

  function update() {
    change.perform();

    if (point.getDistanceFrom(to) < 5) {
      node.remove();

      onEnd();

      return;
    }

    point.moveAndRender(node, getCurrentPosition());

    requestAnimationFrame(update);
  }

  function getCurrentPosition() {
    return {
      x: Math.cos(angle) * change.current * radius + from.position.x,
      y: Math.sin(angle) * change.current * radius + from.position.y,
    };
  }
}

export function moveInACircle(from: Point, to: Point, onEnd: () => void) {
  const distance = from.getDistanceFrom(to);
  const angle = from.getAngleBetween(to);

  const center = new Point({
    x: Math.cos(angle) * distance * 0.5 + from.position.x,
    y: Math.sin(angle) * distance * 0.5 + from.position.y,
  });

  const change = getChange(0, Math.PI, 500);

  const point = new Point(from.position);
  const node = point.render();

  requestAnimationFrame(update);

  function update() {
    if (point.getDistanceFrom(to) < 5) {
      node.remove();

      onEnd();

      return;
    }

    change.perform();

    point.moveAndRender(node, {
      x:
        Math.cos(angle + Math.PI + change.current) * distance * 0.5 +
        center.position.x,
      y:
        Math.sin(angle + Math.PI + change.current) * distance * 0.5 +
        center.position.y,
    });

    requestAnimationFrame(update);
  }
}

function getChange(from: number, to: number, time: number) {
  const FRAME_TIME = 16;

  const diff = (to - from) / (time / FRAME_TIME);

  return {
    current: 0,
    perform() {
      this.current += diff;
    },
  };
}

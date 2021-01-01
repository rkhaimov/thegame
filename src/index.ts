import './styles.css';

const root = document.createElement('div');

root.setAttribute('id', 'root');

document.body.appendChild(root);

const points = [
  { x: 100, y: 100 },
  { x: 400, y: 100 },
  { x: 200, y: 300 },
  { x: 100, y: 100 },
];

points.forEach(placePoint);

sequence(0);

function sequence(index: number) {
  if (index + 1 === points.length) {
    return;
  }

  assertIsNotEmpty(points[index + 1]);

  moveOnALine(points[index], points[index + 1], () => sequence(index + 1));
}

function moveOnALine(from: Point, to: Point, onEnd: () => void) {
  const time = 1_000 / 16;
  const distance = to.x - from.x;
  const speed = distance / time;
  const slope = (to.y - from.y) / (to.x - from.x);
  const current = { x: from.x, y: from.y };

  const node = placePoint(current);

  requestAnimationFrame(update);

  function update() {
    current.x = current.x + speed;

    if (Math.abs(current.x - to.x) < 5) {
      node.remove();

      onEnd();

      return;
    }

    node.style.left = `${current.x}px`;
    node.style.top = `${slope * (current.x - from.x) + from.y}px`;

    requestAnimationFrame(update);
  }
}

function placePoint(point: Point) {
  const node = document.createElement('div');

  node.classList.add('point');

  root.appendChild(node);

  node.style.left = `${point.x}px`;
  node.style.top = `${point.y}px`;

  return node;
}

function assertIsNotEmpty<T>(value: T): asserts value is NonNullable<T> {
  assert(value !== undefined);
}

function assert(condition: any, message = 'Condition is false'): asserts condition {
  if (condition === false) {
    throw new Error(message);
  }
}

type Point = Record<'x' | 'y', number>;

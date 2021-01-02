import './styles.css';
import { moveInACircle, moveInALine } from './line';
import { Point } from './Point';
import { sequenceLoop } from './utils';

const root = document.createElement('div');

root.setAttribute('id', 'root');

document.body.appendChild(root);

const points: Point[] = [
  new Point({ x: 400, y: 100 }),
  new Point({ x: 600, y: 100 }),
  new Point({ x: 600, y: 300 }),
  new Point({ x: 400, y: 300 }),
];

points.forEach((point) => point.render());

sequenceLoop(points, 0, moveInACircle);

setTimeout(() => sequenceLoop(points, 0, moveInALine), 1_000);

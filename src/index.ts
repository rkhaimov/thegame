import './styles.css';
import { createCanvas, createSeveralCircles } from './components';
import { startBounce } from './animations';

const canvas = createCanvas();

const circles = createSeveralCircles();

circles.forEach((circle) => canvas.appendChild(circle));

startBounce({
  target: 1,
  numberOfJumps: 1,
  speed: 0.5,
  onAction(value) {
    scaleCircles(circles, value);
  }
});

startBounce({
  target: 5,
  numberOfJumps: 1,
  speed: 0.25,
  onAction(value) {
    stretchCircles(circles, value);
  }
});

function scaleCircles(circles: SVGCircleElement[], factor: number) {
  circles.forEach(circle => circle.setAttribute('r', `${25 * factor}px`));
}

function stretchCircles(circles: SVGCircleElement[], amount: number) {
  assert(circles.length % 2 === 1);

  const middle = Math.floor(circles.length / 2);

  const before = circles.slice(0, middle);
  const after = circles.slice(middle + 1);

  before.forEach((circle, index) =>
    circle.setAttribute('cx', `${50 - amount * (index + 1)}%`)
  );

  after.forEach((circle, index) =>
    circle.setAttribute('cx', `${50 + amount * (index + 1)}%`)
  );
}

function assert(condition: any): asserts condition {
  if (condition === false) {
    throw new Error('Condition is false');
  }
}

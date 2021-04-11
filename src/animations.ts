import { animate } from './animate';
import bezier from 'bezier-easing';

export function beat(circles: SVGCircleElement[]) {
  let current = -1 * (Math.PI / 2);

  let handle = requestAnimationFrame(update);

  function update() {
    const value = (Math.sin(current) + 1) * 0.03;

    scaleCircles(circles, 1 + value);

    current += 0.045;

    handle = requestAnimationFrame(update);
  }

  return {
    end: () => cancelAnimationFrame(handle),
  };
}

export async function mount(circles: SVGCircleElement[]) {
  await animate({
    duration: 1_000,
    easing: bezier(0.86, 0, 0.07, 1),
    onAnimate(value: number) {
      scaleCircles(circles, value);
    }
  });

  await animate({
    duration: 500,
    easing: bezier(0.65, 0.05, 0.36, 1),
    onAnimate(value: number) {
      stretchCircles(circles, 5 * value);
    }
  });
}

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

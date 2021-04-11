import { createCanvas, createSeveralCircles } from './components';
import './styles.css';
import { beat, mount } from './animations';

const canvas = createCanvas();

const circles = createSeveralCircles();

circles.forEach((circle) => canvas.appendChild(circle));

mount(circles)
  .then(() => {
    const { end } = beat(circles);

    setTimeout(() => end(), 5_000);
  });

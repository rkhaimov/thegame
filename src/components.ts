export function createSeveralCircles() {
  const result: SVGCircleElement[] = [];

  for (let time = 1; time <= 5; time += 1) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    circle.setAttribute('cx', '50%');
    circle.setAttribute('cy', '50%');
    circle.setAttribute('r', '25px');
    circle.setAttribute('fill', 'yellow');
    circle.textContent = `${time}`;

    result.push(circle);
  }

  return result;
}

export function createCanvas() {
  const root = document.createElement('div');

  root.setAttribute('id', 'root');

  document.body.appendChild(root);

  const canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  canvas.setAttribute('width', '100%');
  canvas.setAttribute('height', '100%');

  root.appendChild(canvas);

  return canvas;
}

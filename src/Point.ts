import { assertNotUndefined } from './utils';

export class Point {
  constructor(public position: Position) {}

  getAngleBetween(point: Point) {
    return this.atan2(
      point.position.y - this.position.y,
      point.position.x - this.position.x
    );
  }

  move(position: Position) {
    this.position = position;
  }

  getDistanceFrom(point: Point) {
    return Math.sqrt(
      Math.pow(this.position.x - point.position.x, 2) +
        Math.pow(this.position.y - point.position.y, 2)
    );
  }

  moveAndRender(node: HTMLDivElement, position: Position) {
    this.move(position);

    node.style.left = `${this.position.x}px`;
    node.style.top = `${this.position.y}px`;
  }

  render() {
    const node = document.createElement('div');

    node.classList.add('point');

    const root = document.querySelector('#root');

    assertNotUndefined(root);

    root.appendChild(node);

    node.style.left = `${this.position.x}px`;
    node.style.top = `${this.position.y}px`;

    return node;
  }

  private atan2(y: number, x: number) {
    if (x < 0) {
      return Math.atan(y / x) + Math.PI;
    }

    if (y < 0) {
      return Math.atan(y / x) + 2 * Math.PI;
    }

    return Math.atan(y / x);
  }
}

type Position = { x: number; y: number };

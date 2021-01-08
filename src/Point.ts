export class Point {
  constructor(
    public position: Position,
  ) {}

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

  private atan2(y: number, x: number) {
    if (x === 0 && y === 0) {
      return 0;
    }

    if (x < 0) {
      return Math.atan(y / x) + Math.PI;
    }

    if (y < 0) {
      return Math.atan(y / x) + 2 * Math.PI;
    }

    return Math.atan(y / x);
  }
}

export type Position = { x: number; y: number };

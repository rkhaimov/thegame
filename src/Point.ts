export class Point {
  static fromPairOfStrings(
    position: [string, string],
    handlePositionChange: HandlePositionChange
  ) {
    return new Point(
      {
        x: parseInt(position[0], 10),
        y: parseInt(position[1], 10),
      },
      handlePositionChange
    );
  }

  constructor(
    public position: Position,
    private handlePositionChange: HandlePositionChange
  ) {}

  getAngleBetween(point: Point) {
    return this.atan2(
      point.position.y - this.position.y,
      point.position.x - this.position.x
    );
  }

  move(position: Position) {
    this.handlePositionChange(this.position, position);

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

type HandlePositionChange = (
  from: Point['position'],
  to: Point['position']
) => void;

export type Position = { x: number; y: number };

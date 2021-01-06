import { Point } from './Point';

describe('Point', () => {
  it('should return angle', () => {
    const p1 = new Point({ x: 2, y: 2 }, noop);
    const p2 = new Point({ x: 4, y: 2 }, noop);

    expect(p1.getAngleBetween(p2)).toBe(0);

    p2.move({ x: 2, y: 4 });

    expect(p1.getAngleBetween(p2)).toBe(Math.PI / 2);

    p2.move({ x: 0, y: 2 });

    expect(p1.getAngleBetween(p2)).toBe(Math.PI);

    p2.move({ x: 2, y: 0 });

    expect(p1.getAngleBetween(p2)).toBe((3 * Math.PI) / 2);

    p2.move({ x: 3, y: 1 });

    expect(p1.getAngleBetween(p2)).toMatchSnapshot();
  });

  it('should return distance', () => {
    const p1 = new Point({ x: 0, y: 0 }, noop);
    const p2 = new Point({ x: 3, y: 4 }, noop);

    expect(p1.getDistanceFrom(p2)).toBe(5);

    p1.move({ x: 2, y: 2 });
    p2.move({ x: 2, y: 2 });

    expect(p1.getDistanceFrom(p2)).toBe(0);

    p2.move({ x: 3, y: 1 });

    expect(p1.getDistanceFrom(p2)).toBe(Math.sqrt(2));
  });
});

function noop() {}

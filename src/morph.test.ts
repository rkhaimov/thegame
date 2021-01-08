import { getPointsMoves, Shape } from './morph';
import { assert } from './utils';

describe('morph', () => {
  it('should morph shapes of equal sizes', () => {
    const s1 = createShape('M0 0 L5 5 L10 30 Z');
    const s2 = createShape('M10 0 L15 5 L20 30 Z');

    expect(getPointsMoves(s1, s2)).toMatchSnapshot();
  });

  it('should morph shapes of bigger sizes', () => {
    const s1 = createShape('M0 0 L5 5 L10 30 Z');
    const s2 = createShape('M10 0 L15 5 L20 30 L30 40 L60 40 Z');

    expect(getPointsMoves(s1, s2)).toMatchSnapshot();
  });

  it('should morph shapes of lesser sizes', () => {
    const s1 = createShape('M0 0 L5 5 L10 30 Z');
    const s2 = createShape('M10 0 L15 5 Z');

    expect(getPointsMoves(s1, s2)).toMatchSnapshot();
  });

  it('should not accept invalid paths', () => {
    expect(() =>
      getPointsMoves(
        createShape('0 0 L5 5 L10 30 Z'),
        createShape('M0 0 L0 0 Z')
      )
    ).toThrow();

    expect(() =>
      getPointsMoves(
        createShape('M0 0 L5 5 L10 30'),
        createShape('M0 0 L0 0 Z')
      )
    ).toThrow();

    expect(() =>
      getPointsMoves(
        createShape('M0 0 L5 5 X10 30 Z'),
        createShape('M0 0 L0 0 Z')
      )
    ).toThrow();
  });
});

function createShape(path: string): Shape {
  return {
    getAttribute: (qualifiedName) => {
      assert(qualifiedName === 'd', 'Unknown qualifier');

      return path;
    },
  };
}

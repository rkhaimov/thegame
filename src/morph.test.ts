import { getPointsMoves, Shape } from './morph';

describe('morph', () => {
  it('should morph shapes of equal sizes', () => {
    const s1: Shape = {
      getAttribute: () => 'M0 0 L5 5 L10 30 Z',
    };

    const s2: Shape = {
      getAttribute: () => 'M10 0 L15 5 L20 30 Z',
    };

    expect(getPointsMoves(s1, s2)).toMatchSnapshot();
  });
});

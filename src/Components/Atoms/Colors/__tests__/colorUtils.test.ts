import { colorConverter } from '../';

describe('colorConverter util', () => {
  it('colorConverter converts correctly', () => {
    expect(colorConverter('red')).toEqual({ rgba: 'rgba(255, 0, 0, 1)', hex: '#FF0000' });

    expect(colorConverter('toto')).toEqual({ rgba: 'rgba(0, 0, 0, 0)', hex: '#000000' });
  });
});

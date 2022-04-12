import { computePosition, MenuDirectionEnum } from '../tooltipUtils';

describe('computePosition', () => {
  beforeAll(() => {
    jest.spyOn(document.body, 'clientHeight', 'get').mockReturnValue(1000);
    jest.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(1000);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('computePosition Left and can go left', async () => {
    expect(
      computePosition(
        MenuDirectionEnum.LEFT,
        { top: 100, left: 100, width: 10, height: 10 } as DOMRect,
        { width: 20, height: 20 } as DOMRect,
        5,
      ),
    ).toEqual({
      direction: 'left',
      left: 75,
      top: 95,
    });
  });

  it('computePosition Left and can go right', async () => {
    expect(
      computePosition(
        MenuDirectionEnum.LEFT,
        { top: 100, left: 0, width: 10, height: 10 } as DOMRect,
        { width: 20, height: 20 } as DOMRect,
        5,
      ),
    ).toEqual({
      direction: 'right',
      left: 15,
      top: 95,
    });
  });

  it('computePosition top and can go bottom', async () => {
    expect(
      computePosition(
        MenuDirectionEnum.LEFT,
        { top: 0, left: 100, width: 10, height: 10 } as DOMRect,
        { width: 20, height: 20 } as DOMRect,
        5,
      ),
    ).toEqual({
      direction: 'bottom',
      left: 95,
      top: 15,
    });
  });
});

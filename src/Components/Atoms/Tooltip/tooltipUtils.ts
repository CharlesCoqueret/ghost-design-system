export enum MenuDirectionEnum {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
}

const MenuDirectionOrder = [
  MenuDirectionEnum.TOP,
  MenuDirectionEnum.RIGHT,
  MenuDirectionEnum.BOTTOM,
  MenuDirectionEnum.LEFT,
];

export const computePosition = (
  preferedDirection: MenuDirectionEnum,
  triggerDimensions: DOMRect,
  tooltipDimensions: DOMRect,
  extraMargin: number,
): { left: number; top: number; direction: MenuDirectionEnum } => {
  const results = {
    [MenuDirectionEnum.TOP]: {
      left: triggerDimensions.left + triggerDimensions.width / 2 - tooltipDimensions.width / 2,
      top: triggerDimensions.top - tooltipDimensions.height - extraMargin,
    },
    [MenuDirectionEnum.RIGHT]: {
      left: triggerDimensions.left + triggerDimensions.width + extraMargin,
      top: triggerDimensions.top + triggerDimensions.height / 2 - tooltipDimensions.height / 2,
    },
    [MenuDirectionEnum.BOTTOM]: {
      left: triggerDimensions.left + triggerDimensions.width / 2 - tooltipDimensions.width / 2,
      top: triggerDimensions.top + triggerDimensions.height + extraMargin,
    },
    [MenuDirectionEnum.LEFT]: {
      left: triggerDimensions.left - tooltipDimensions.width - extraMargin,
      top: triggerDimensions.top + triggerDimensions.height / 2 - tooltipDimensions.height / 2,
    },
  };

  const fitMap = MenuDirectionOrder.filter((direction) => {
    return (
      results[direction].left > 0 &&
      results[direction].left + tooltipDimensions.width <= screen.availWidth &&
      results[direction].top > 0 &&
      results[direction].top + tooltipDimensions.height <= screen.availHeight
    );
  });

  // Check prefered direction
  if (fitMap.length === 0 || fitMap.indexOf(preferedDirection) >= 0) {
    return { ...results[preferedDirection], direction: preferedDirection };
  }

  // Check opposite to prefered direction
  const oppositeToPreferedDirection = MenuDirectionOrder[(MenuDirectionOrder.indexOf(preferedDirection) + 2) % 4];
  if (fitMap.indexOf(oppositeToPreferedDirection) >= 0) {
    return { ...results[oppositeToPreferedDirection], direction: oppositeToPreferedDirection };
  }

  const fitingDirection = fitMap[0];
  return { ...results[fitingDirection], direction: fitingDirection };
};

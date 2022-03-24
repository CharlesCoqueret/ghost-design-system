import { useEffect, useLayoutEffect } from 'react';

/** Hook providing useEffect or useLayoutEffect depending on the presence of window (cf: https://reactjs.org/docs/hooks-reference.html#uselayouteffect )*/
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;

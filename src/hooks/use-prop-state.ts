import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import isEqual from 'lodash/isEqual';

import usePrevious from './use-previous';

const usePropState = <T>(data: T): [T, Dispatch<SetStateAction<T>>] => {
  const [dataset, setDataset] = useState(data);
  const prevDatas = usePrevious(data);

  const handleChangeDataset = setDataset;

  useEffect(() => {
    if (!isEqual(data, prevDatas)) setDataset(data);
  }, [data, prevDatas]);

  return [dataset, handleChangeDataset];
};

export default usePropState;

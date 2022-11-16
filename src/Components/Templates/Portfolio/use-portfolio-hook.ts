import { useEffect, useState } from 'react';
import axios, { AxiosInstance, Canceler } from 'axios';

import { SortDirectionEnum } from '../../Organisms/DataTable/Common/types';

const usePortfolioRequest = <FilterType, PortfolioType, RequestBodyType, RequestParamType, ResultType>(
  axiosInstance: AxiosInstance,
  baseUrl: string,
  direction: SortDirectionEnum | undefined,
  filterValues: Partial<FilterType> | undefined,
  handleError: (error: unknown) => void,
  hasMore: (currentSize: number, result: ResultType) => boolean,
  requestBodyMapper: (
    filterValues: Partial<FilterType> | undefined,
    sort?: keyof PortfolioType,
    direction?: SortDirectionEnum,
  ) => RequestBodyType,
  requestParamMapper: (filterValue: Partial<FilterType> | undefined) => RequestParamType,
  resultMapper: (result: ResultType) => Promise<Array<PortfolioType>>,
  sort: keyof PortfolioType | undefined,
): { isLoading: boolean; entities: Array<PortfolioType>; hasMoreEntities: boolean } => {
  const { CancelToken } = axios;
  let cancel: Canceler;
  let cancelled = false;

  const [isLoading, setIsLoading] = useState(true);
  const [entities, setEntities] = useState<Array<PortfolioType>>([]);
  const [hasMoreEntities, setHasMoreEntities] = useState(false);

  useEffect(() => {
    setEntities([]);
  }, [filterValues, sort, direction]);

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .post<ResultType>(baseUrl, requestBodyMapper(filterValues), {
        ...requestParamMapper(filterValues),
        cancelToken: new CancelToken((c) => {
          cancel = c;
        }),
      })
      .then((response) => {
        if (cancelled) {
          setHasMoreEntities(false);
          setIsLoading(false);
          return;
        }
        resultMapper(response.data).then((newItems) => {
          if (cancelled) {
            setHasMoreEntities(false);
            setIsLoading(false);
            return;
          }
          setEntities((prev) => {
            return [...prev, ...newItems];
          });
          setHasMoreEntities(hasMore(entities.length + newItems.length, response.data));
          setIsLoading(false);
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setHasMoreEntities(false);
        setIsLoading(false);
        handleError(err);
      });

    return (): void => {
      cancelled = true;
      if (cancel) {
        cancel();
      }
    };
  }, [filterValues, sort, direction]);

  return { isLoading, entities, hasMoreEntities };
};

export default usePortfolioRequest;

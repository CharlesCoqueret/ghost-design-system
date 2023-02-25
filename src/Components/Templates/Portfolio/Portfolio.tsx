import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import PortfolioWrapped, { IPortfolioProps } from './PortfolioWrapped';

const Portfolio = <FilterType, PortfolioType, ResponseType, PaginationType>(
  props: IPortfolioProps<FilterType, PortfolioType, ResponseType, PaginationType>,
) => {
  const queryClient = new QueryClient();

  return (
    <div className='gds-portfolio'>
      <QueryClientProvider client={queryClient}>
        <PortfolioWrapped<FilterType, PortfolioType, ResponseType, PaginationType> {...props} />
      </QueryClientProvider>
    </div>
  );
};

export default Portfolio;

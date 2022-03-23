import React, { PropsWithChildren, ReactElement } from 'react';
import { NavLinkProps, Location, Path } from 'react-router-dom';

export const locationString = (location: string | Location | Partial<Path> | undefined): string => {
  if (typeof location === 'string') {
    return location;
  }
  return location?.pathname || '';
};

export const NavLink = (props: PropsWithChildren<NavLinkProps> & { ['data-testid']?: string }): ReactElement => {
  const { children, className, ['data-testid']: dataTestId, end, onClick, target, to } = props;

  return (
    <a
      href={locationString(to)}
      className={className as string | undefined}
      data-testid={dataTestId}
      onClick={onClick}
      target={target}>
      {end ? 'full url' : 'partial url'}
      {children}
    </a>
  );
};

export const useNavigate = () => {
  return (url: string): void => {
    console.info('url pushed:', url);
  };
};

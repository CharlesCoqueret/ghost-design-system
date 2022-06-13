import React, { PropsWithChildren, ReactElement } from 'react';
import { NavLinkProps } from 'react-router-dom';
import { Location, LocationDescriptor } from 'history';

export const locationString = (
  location: string | Location | LocationDescriptor | ((location: Location) => LocationDescriptor) | undefined,
): string => {
  if (location === undefined || location == null) {
    return '';
  }

  if (typeof location === 'string') {
    return location;
  }

  if ('pathname' in location) {
    return location.pathname || '';
  }

  return '';
};

export const NavLink = (props: PropsWithChildren<NavLinkProps> & { ['data-testid']?: string }): ReactElement => {
  const { children, className, ['data-testid']: dataTestId, exact, onClick, target, to } = props;

  return (
    <a
      href={locationString(to)}
      className={className as string | undefined}
      data-testid={dataTestId}
      onClick={onClick}
      target={target}>
      {exact ? 'full url' : 'partial url'}
      {children}
    </a>
  );
};

export const useNavigate = () => {
  return (url: string): void => {
    console.info('url pushed:', url);
  };
};

export const useHistory = () => {
  return {
    push: (url: string): void => {
      console.info('url pushed:', url);
    },
  };
};

import { Location } from 'react-router-dom';

/**
 * Converts a Location of string to full path
 *
 * @param location string or Location object
 * @returns full path
 */
export const locationString = (location: string | Location): string => {
  if (typeof location === 'string') {
    return location;
  }
  return location.pathname;
};

/**
 * Indicates if the url is an external link
 *
 * @param url string or Location object
 * @returns true if the link is an external link
 */
export const isExternalLink = (url: string | Location): boolean => {
  const tmp = document.createElement('a');
  tmp.href = locationString(url);
  return tmp.host !== window.location.host;
};

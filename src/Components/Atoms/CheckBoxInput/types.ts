import { ReactElement } from 'react';

export interface IToggleEntry {
  value: string;
  checked?: boolean;
  label: string | ReactElement;
  highlighted?: boolean;
}

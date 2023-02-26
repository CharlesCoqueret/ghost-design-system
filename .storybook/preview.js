import React from 'react';
import { ThemeProvider, loadIcons } from '../src/Components';

import '../src/assets/index.scss';

loadIcons();

export const parameters = {
  layout: 'fullscreen',
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Atom', 'Molecule', 'Organism', 'Template'],
    },
  },
};

export const decorators = [
  (Story) => (
    <div style={{ padding: '42px' }}>
      <ThemeProvider />
      <Story />
      <div id='root-portal-id' />
      <div id='toaster-portal-id' />
      <div id='select-portal-id' />
    </div>
  ),
];

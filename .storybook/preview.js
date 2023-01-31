import React from 'react';
import ThemeProvider from '../src/Components/Atoms/Theme/ThemeProvider';
import { loadIcons } from '../src/Components';

import '../src/assets/index.scss';

loadIcons();

export const parameters = {
  controls: { expanded: true },
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
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  ),
];

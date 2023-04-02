import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';

import { ThemeProvider, loadIcons } from '../src/Components';

import '../src/assets/index.scss';
import './storybook.css';

loadIcons();

export const parameters = {
  layout: 'fullscreen',
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Atom', 'Molecule', 'Organism', 'Template', 'Support'],
    },
  },
};

export const decorators = [
  (Story) => (
    <div style={{ padding: '42px' }}>
      <Router>
        <ThemeProvider />
        <Story />
      </Router>
    </div>
  ),
];

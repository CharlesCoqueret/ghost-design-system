import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider, loadIcons } from '../src/Components';

import '../src/assets/index.scss';
import './storybook.css';

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
      <Router>
        <ThemeProvider />
        <Story />
        <div id='root-portal-id' />
        <div id='toaster-portal-id' />
      </Router>
    </div>
  ),
];

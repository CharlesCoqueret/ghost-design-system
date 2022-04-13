import { loadIcons } from '../src/Components';
import '../src/assets/index.scss';

loadIcons();

export const parameters = {
  controls: { expanded: true },
  layout: 'fullscreen',
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Atoms', 'Organisms', 'Molecules'],
    },
  },
};

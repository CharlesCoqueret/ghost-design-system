# Ghost Design System - React Components library

[Demo](https://charlescoqueret.github.io/ghost-design-system/)

[![Coverage Status](https://coveralls.io/repos/github/CharlesCoqueret/ghost-design-system/badge.svg?branch=main)](https://coveralls.io/github/CharlesCoqueret/ghost-design-system?branch=main)
![node-current](https://img.shields.io/node/v/ghost-design-system)

## Available components:

- Atoms:
  - [Badge (notification and indicator)](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/atom-badge--badge)
  - [Icons](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/atom-icon--page)
  - Layout
    - [Col](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/atom-layout--col)
    - [Row](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/atom-layout--row)
    - [Section](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/atom-layout--section)
    - [Separator](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/atom-layout--separator)
  - [Link](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/atom-link--link)
  - [Modal](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/atom-modal--default)
  - Portal
  - [Pulsar](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/atom-pulsar--pulsar)
  - [Theme](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/atom-theme--page)
  - [Tooltip](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/atom-tooltip--tooltip)
  - Typography
    - [Text](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/atom-typography--text)
    - [Title](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/atom-typography--title)
- Molecules:
  - [Amount field](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/molecule-amountfield--amount-field)
  - [Banner](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/molecule-banner--banner)
  - [Button](https://charlescoqueret.github.io/ghost-design-system?path=/docs/molecule-button--button)
  - [Checkbox field](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/molecule-checkboxfield--checkbox-field)
  - [Datepicker field](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/molecule-datepickerfield--date-picker-field)
  - [File field](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/molecule-filefield--file-field)
  - [Percentage field](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/molecule-percentagefield--percentage-field)
  - [Popover](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/molecule-popover--popover)
  - [Rich Text field](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/molecule-richtextfield--rich-text-field)
  - Select field:
    - [Single](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/molecule-selectfield--select-field)
    - [Multi](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/molecule-multiselectfield--multi-select-field)
    - [Autocomplete (aka Dynamic Search)](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/molecule-dynamicsearchfield--dynamic-search-field)
    - [Autocomplete creatable (aka Dynamic Search Creatable)](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/molecule-dynamicsearchcreatablefield--dynamic-search-creatable-field)
  - [Switch field](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/molecule-switchfield--switch-field)
  - [Textarea field](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/molecule-textareafield--text-area-field)
  - [Text field](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/molecule-textfield--text-field)
  - [Toaster](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/molecule-toaster--toaster)
  - [YearPicker field](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/molecule-yearpickerfield--year-picker-field)
- Organisms:
  - [ActionBar](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/organism--action-bar)
  - DataTable:
    - [Generic Data Table](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/organism-datatable--data-table)
    - [Editable Data Table (full editable)](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/organism-datatable--editable-data-table)
    - [Line editable Data Table (editon in popup form with data validation)](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/organism-datatable--line-editable-data-table)
    - [Line editable in place data table (edition of a line in place)](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/organism-datatable--line-editable-in-place-data-table)
    - [Static data table](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/organism-datatable--static-data-table)
    - [Colunns](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/organism-datatable-columns--page)
  - [Filter](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/organism--filter)
  - Form:
    - Form component
    - [useForm hook](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/organism-useform--basic)
    - [useFormLegacy hook](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/organism-useformlegacy--default)
  - [NavBar](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/organism-navbar--nav-bar)
  - [SideBar](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/organism-sidebar--side-bar)
- Templates:
  - [Portfolio](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/template-portfolio--portfolio)

## Usage

1. Run the command:

```console
npm install ghost-design-system
```

or

```console
yarn add ghost-design-system
```

3. Load the required icon set and initialize the ThemeProvider, for example in your `index.tsx` :

```tsx
import { loadIcons, ThemeProvider } from 'ghost-design-system';
import '~ghost-design-system/dist/ghost-design-system.css';

loadIcons();

const App = () => {
  return (
    <ThemeProvider>
      <RestOfYourApp />
    </ThemeProvider>
  );
};
```

5. You should be ready to use any of the components of the library.

---

## References

This react components library uses the following:

- [@fortawesome](https://fontawesome.com/)
- [@szhsin/react-menu](https://szhsin.github.io/react-menu/)
- [classnames](https://github.com/JedWatson/classnames#readme)
- [date-fns](https://date-fns.org/)
- [lodash](https://lodash.com/)
- [numeral](http://numeraljs.com/)
- [react-collapsed](https://github.com/roginfarrer/react-collapsed#react-collapsed-usecollapse)
- [react-datepicker](https://reactdatepicker.com/)
- [react-hot-toast](https://react-hot-toast.com/)
- [react-infinite-scroller](https://github.com/danbovey/react-infinite-scroller)
- [react-intersection-observer](https://react-intersection-observer.vercel.app/?path=/story/introduction--page)
- [react-number-format](https://github.com/s-yadav/react-number-format#readme)
- [react-query](https://react-query-v3.tanstack.com/)
- [react-select](https://react-select.com/)
- [react-textarea-autosize](http://andarist.github.io/react-textarea-autosize/)
- [suneditor](http://suneditor.com/)
- [tippyjs](https://atomiks.github.io/tippyjs/)
- [yup](https://github.com/jquense/yup)

Peer dependencies:

- [react](https://reactjs.org/)
- [react-dom](https://reactjs.org/docs/react-dom.html)
- [react-router-dom](https://v5.reactrouter.com/)

Dev dependencies:

- [ESLint](https://eslint.org/)
- [Jest](https://jestjs.io/)
- [Prettier](https://prettier.io/)
- [Rollup](https://rollupjs.org/)
- [SASS](https://sass-lang.com/)
- [Storybook](https://storybook.js.org/)
- [Testing-library](https://testing-library.com/)
- [Typescript](https://www.typescriptlang.org/)

---

[To go further](./FURTHER.md)

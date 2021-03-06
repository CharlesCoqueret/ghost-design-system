# Ghost Design System - React Components library

[Demo](https://charlescoqueret.github.io/ghost-design-system/)

[![Coverage Status](https://coveralls.io/repos/github/CharlesCoqueret/ghost-design-system/badge.svg?branch=main)](https://coveralls.io/github/CharlesCoqueret/ghost-design-system?branch=main)
![node-current](https://img.shields.io/node/v/ghost-design-system)

## Available components:

- Atoms:
  - [Badge (notification and indicator)](https://charlescoqueret.github.io/ghost-design-system/?path=/story/atom-badge--default)
  - [Colors](https://charlescoqueret.github.io/ghost-design-system/?path=/story/atom-colors--brand-palette)
  - [Icons](https://charlescoqueret.github.io/ghost-design-system/?path=/story/atom-icon--list)
  - Layout
    - [Row](https://charlescoqueret.github.io/ghost-design-system/?path=/story/atom-layout-row--default)
    - [Col](https://charlescoqueret.github.io/ghost-design-system/?path=/story/atom-layout-col--default)
    - [Collapsible section](https://charlescoqueret.github.io/ghost-design-system/?path=/story/atom-layout-section--default)
  - [Link](https://charlescoqueret.github.io/ghost-design-system/?path=/story/atom-link--default)
  - [Modal](https://charlescoqueret.github.io/ghost-design-system/?path=/story/atom-modal--default)
  - Portal
  - [Pulsar](https://charlescoqueret.github.io/ghost-design-system/?path=/story/atom-pulsar--default)
  - [Tooltip](https://charlescoqueret.github.io/ghost-design-system/?path=/story/atom-tooltip--default)
  - Typography
    - [Text](https://charlescoqueret.github.io/ghost-design-system/?path=/story/atom-typography-text--default)
    - [Title](https://charlescoqueret.github.io/ghost-design-system/?path=/story/atom-typography-title--default)
- Molecules:
  - [Amount field](https://charlescoqueret.github.io/ghost-design-system/?path=/story/molecule-amountfield--default)
  - [Button](https://charlescoqueret.github.io/ghost-design-system/?path=/story/molecule-button--simple)
  - [Checkbox field](https://charlescoqueret.github.io/ghost-design-system/?path=/story/molecule-checkboxfield--default)
  - [Datepicker field](https://charlescoqueret.github.io/ghost-design-system/?path=/story/molecule-datepickerfield--default)
  - [File field](https://charlescoqueret.github.io/ghost-design-system/?path=/story/molecule-filefield--default)
  - [Percentage field](https://charlescoqueret.github.io/ghost-design-system/?path=/story/molecule-percentagefield--default)
  - [Popover](https://charlescoqueret.github.io/ghost-design-system/?path=/story/molecule-popover--default)
  - [Rich Text field](https://charlescoqueret.github.io/ghost-design-system/?path=/story/molecule-richtextfield--default)
  - Select field:
    - [Single](https://charlescoqueret.github.io/ghost-design-system/?path=/story/molecule-selectfield--default)
    - [Multi](https://charlescoqueret.github.io/ghost-design-system/?path=/story/molecule-multiselectfield--default)
    - [Autocomplete (aka Dynamic Search)](https://charlescoqueret.github.io/ghost-design-system/?path=/story/molecule-dynamicsearchfield--default)
    - [Autocomplete creatable (aka Dynamic Search Creatable)](https://charlescoqueret.github.io/ghost-design-system/?path=/story/molecule-dynamicsearchcreatablefield--default)
  - [Switch field](https://charlescoqueret.github.io/ghost-design-system/?path=/story/molecule-switchfield--default)
  - [Textarea field](https://charlescoqueret.github.io/ghost-design-system/?path=/story/molecule-textareafield--default)
  - [Text field](https://charlescoqueret.github.io/ghost-design-system/?path=/story/molecule-textfield--default)
  - [YearPicker field](https://charlescoqueret.github.io/ghost-design-system/?path=/story/molecule-yearpickerfield--default)
- Organisms:
  - [ActionBar](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/organism--action-bar)
  - Datatable:
    - [Generic Data Table](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/organism-datatable--data-table)
    - [Editable Data Table (full editable)](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/organism-datatable--editable-data-table)
    - [Line editable Data Table (editon in popup form with data validation)](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/organism-datatable--line-editable-data-table)
    - [Line editable in place data table (edition of a line in place)](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/organism-datatable--line-editable-in-place-data-table)
    - [Static data table](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/organism-datatable--static-data-table)
    - [Colunns](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/organism-datatable-columns--page)
  - [Filter](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/organism--filter)
  - Form:
    - Form component
    - [useForm hook](https://charlescoqueret.github.io/ghost-design-system/?path=/story/organism-useform--default)
  - [NavBar](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/organism--nav-bar)
  - [SideBar](https://charlescoqueret.github.io/ghost-design-system/?path=/docs/organism--side-bar)

## Usage

1. Run the command:

```console
npm install ghost-design-system
```

2. Define the set of colors by copying the file: ~ghost-design-system/dist/assets/\_colors.scss)

```scss
// Neutral pallet
$chalk: rgb(228, 228, 228);
$charcoal: rgb(51, 51, 51);
$pebble: rgb(117, 117, 117);
$silver: rgb(196, 196, 196);
$smoke: rgb(248, 248, 248);
$white: rgb(255, 255, 255);

// Additional pallet
$scooter: rgb(38, 186, 212);
$buttercup: rgb(244, 174, 38);
$cerulean: rgb(1, 82, 129);
$cinnabar: rgb(232, 61, 71);
$fern: rgb(92, 184, 92);
$sky: rgb(16, 156, 241);
$tangerine: rgb(229, 114, 0);

$error: rgb(255, 52, 24);

$primary: $scooter;
$secondary: $pebble;
$tertiary: $charcoal;

$fontfamily: 'Montserrat', sans-serif;
```

3. Create your `index.scss` file:

```scss
@import 'colors.scss';
@import '~ghost-design-system/dist/assets/_global.scss';
@import '~ghost-design-system/dist/assets/_general.scss'; // Optional
```

4. Load the required icon set, for example in your `index.tsx` :

```ts
import { loadIcons } from 'ghost-design-system';

loadIcons();
```

5. You should be ready to use any of the components of the library.

---

## References

This react components library uses the following:

- [@fortawesome](https://fontawesome.com/)
- [@szhsin/react-menu](https://szhsin.github.io/react-menu/)
- [classnames](https://github.com/JedWatson/classnames#readme)
- [color-alpha](https://github.com/colorjs/color-alpha)
- [color-rgba](https://github.com/colorjs/color-rgba)
- [date-fns](https://date-fns.org/)
- [lodash](https://lodash.com/)
- [numeral](http://numeraljs.com/)
- [react-collapsed](https://github.com/roginfarrer/react-collapsed#react-collapsed-usecollapse)
- [react-datepicker](https://reactdatepicker.com/)
- [react-number-format](https://github.com/s-yadav/react-number-format#readme)
- [react-select](https://react-select.com/)
- [suneditor](http://suneditor.com/)
- [tippyjs](https://atomiks.github.io/tippyjs/)
- [yup](https://github.com/jquense/yup)

Peer dependencies:

- [react](https://fr.reactjs.org/)
- [react-dom](https://fr.reactjs.org/docs/react-dom.html)
- [suneditor](http://suneditor.com/) - for SCSS import
- [tippyjs](https://atomiks.github.io/tippyjs/) - for SCSS import

Dev dependencies:

- [ESLint](https://eslint.org/)
- [Jest](https://jestjs.io/)
- [Prettier](https://prettier.io/)
- [Rollup](https://rollupjs.org/)
- [SCSS](https://sass-lang.com/)
- [Storybook](https://storybook.js.org/)
- [Testing-library](https://testing-library.com/)
- [Typescript](https://www.typescriptlang.org/)

---

[To go further](./FURTHER.md)

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
    - [Collapsable section](https://charlescoqueret.github.io/ghost-design-system/?path=/story/atom-layout-section--default)
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
  - [ActionBar](https://charlescoqueret.github.io/ghost-design-system/?path=/story/organism-actionbar--default)
  - Datatable:
    - [Editable Data Table (full editable)](https://charlescoqueret.github.io/ghost-design-system/?path=/story/organism-datatable-editabledatatable--default)
    - [Line editable Data Table (editon in popup form with data validation)](https://charlescoqueret.github.io/ghost-design-system/?path=/story/organism-datatable-lineeditabledatatable--default)
    - [Line editable in place data table (edition of a line in place)](https://charlescoqueret.github.io/ghost-design-system/?path=/story/organism-datatable-lineeditableinplacedatatable--default)
    - [Static data table](https://charlescoqueret.github.io/ghost-design-system/?path=/story/organism-datatable-staticdatatable--default)
  - [Filter](https://charlescoqueret.github.io/ghost-design-system/?path=/story/organism-filter--default)
  - Form:
    - Form component
    - [useForm hook](https://charlescoqueret.github.io/ghost-design-system/?path=/story/organism-useform--default)
  - [NavBar](https://charlescoqueret.github.io/ghost-design-system/?path=/story/organism-navbar--default)
  - [SideBar](https://charlescoqueret.github.io/ghost-design-system/?path=/story/organism-sidebar--default)

## Usage

1. Run the command:

```
npm install ghost-design-system
```

2. Define the set of colors by copying the file: ~ghost-design-system/dist/assets/\_colors.scss)

```{scss}
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

4. Create your `index.scss` file by starting it with:

```{scss}
@import 'colors.scss';
@import '~ghost-design-system/dist/assets/_global.scss';
@import '~ghost-design-system/dist/assets/_general.scss'; // Optional

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

# To go further

## Basic Folder Structure

```
├── .storybook
├── src
│   ├── Components
|   |   ├── Atoms
|   |   |   ├── Example
|   |   |   |   ├── __tests__
|   |   |   |   |   ├── Example.test.tsx
|   |   |   |   ├── Example.stories.mdx
|   |   |   |   ├── Example.tsx
|   |   |   |   ├── index.ts
|   |   |   ├── index.ts
|   |   ├── index.ts
|   ├── index.ts
├── LICENSE
├── package.json
├── README.md
```

Once you have created your new component make sure you have exported it in the `src/components/index.ts` file. Doing so allows the component to be compiled.

```
// src/components/index.ts
export \* from './MyComponent';
export \* from './SomeOtherComponent';

```

You can develop your new component using storybook as your playground. Once you have added the `.stories.tsx` file for you new component, you can run `yarn storybook` to start the service.

## Tests

```

$ npm run test

```

Watch

```

$ npm run test:watch

```

Coverage

```

$ npm run test:coverage

```

## Prettier

```

$ npm run format

```

Validate project formatting

```

$ npm run format:check

```

## Lint

```

$ npm run lint

```

Fix

```

$ npm run lint:fix

```

## Storybook

```

$ npm run storybook

```

Build storybook

```

$ npm run build-storybook

```

## Building your library

```

$ npm run build

```

The build output will go into the `dist` directory

#### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (this correlates with `PATCH` in semantic versioning)
- **ci**: Changes to our CI configuration files and scripts (no version changes)
- **docs**: Documentation only changes (no version changes)
- **feat**: A new feature (this correlates with `MINOR` in semantic versioning).
- **fix**: A bug fix (this correlates with `PATCH` in semantic versioning).
- **perf**: A code change that improves performance (this correlates with `PATCH` in semantic versioning).
- **refactor**: A code change that neither fixes a bug nor adds a feature (no version changes)
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semicolons, etc) (no version changes)
- **test**: Adding missing tests or correcting existing tests (no version changes)
- **revert**: Reverts a previous commit (this correlates with `PATCH` in semantic versioning).

#### Description

The Description contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

#### Body (optional)

Use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

#### Footer (optional)

The footer should contain any information about **Breaking Changes** and is also the place to
reference issues that this commit **Closes**.

### Breaking Changes

A commit that has the text `BREAKING CHANGE:` at the beginning of its optional body or footer section introduces a breaking API change (correlating with `MAJOR` in semantic versioning). A BREAKING CHANGE can be part of commits of any type.

should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Examples

[see examples](https://www.conventionalcommits.org/en/v1.0.0/#examples)

---

## Changelog

The changelog.md is automatically generated from the following types of commits:

- `feat`
- `fix`
- `perf`
- `revert`

In addition to these types, any `breaking change` will also be added to the changelog.

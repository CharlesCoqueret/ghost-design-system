# Ghost Design System - React Components library

[Demo](https://charlescoqueret.github.io/ghost-design-system/)

<details>
  <summary>Available components:</summary>
  
  * Atoms:
  * Badge (notification and indicator)
  * Colors
  * Icons
  * Layout (Row, Col, Collapsable section)
  * Link
  * Modal
  * Portal
  * Tooltip
* Molecules:
  * Amount field
  * Button
  * Checkbox field
  * Datepicker field
  * Percentage field
  * Popover
  * Select field:
    * Single
    * Multi
    * Autocomplete (aka Dynamic Search)
    * Autocomplete creatable (aka Dynamic Search Creatable)
  * Switch field
  * Textarea field
  * Text field
  * Yearpicker field
* Organisms:
  * ActionBar
  * Datatable:
    * Editable Data Table (full editable)
    * Line editable Data Table (edit in popup form with data validation)
    * Line editable in place data table (edit of a line in place)
    * Static data table
  * Form:
    * Form component
    * useForm hook
  * NavBar
  * SideBar
</details>

This react components library uses the following:

- [classnames](https://github.com/JedWatson/classnames#readme)
- [color-alpha](https://github.com/colorjs/color-alpha)
- [color-rgba](https://github.com/colorjs/color-rgba)
- [date-fns](https://date-fns.org/)
- [lodash](https://lodash.com/)
- [numeral](http://numeraljs.com/)
- [react-datepicker](https://reactdatepicker.com/)
- [react-number-format](https://github.com/s-yadav/react-number-format#readme)
- [react-select](https://react-select.com/)

Peer dependencies:

- [@fortawesome/fontawesome-svg-core](https://fontawesome.com/)
- [@fortawesome/pro-light-svg-icons](https://fontawesome.com/)
- [@fortawesome/pro-regular-svg-icons](https://fontawesome.com/)
- [@fortawesome/pro-solid-svg-icons](https://fontawesome.com/)
- [@fortawesome/react-fontawesome](https://fontawesome.com/)
- [react ^16.8.0](https://fr.reactjs.org/)
- [react-dom ^16.8.0](https://fr.reactjs.org/docs/react-dom.html)
- [react-router-dom ^6.2.2](https://reactrouter.com/)

Dev dependencies:

- [Typescript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Storybook](https://storybook.js.org/)
- [SCSS](https://sass-lang.com/)
- [Jest](https://jestjs.io/)

<details>
  <summary>Read further</summary>
## Basic Folder Structure

```
├── .storybook
├── src
│   ├── components
|   |   ├── Example
|   |   |   ├── __tests__
|   |   |   |   ├── Example.test.tsx
|   |   |   ├── Example.stories.tsx
|   |   |   ├── Example.tsx
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
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) (no version changes)
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

---

## Usage

- Install the library

```

$ npm install @cc/ghost-design-system

```

- Define the set of colors for the client (by copying the file: `~/@cc/ghost-design-system/dist/assets/_colors.scss`)
- Generate your `index.scss` file

```
@import './YOUR_COLOR_FILE.scss';
@import '~/react-components/dist/assets/global.scss';
```

- In your first component using the library, simply import the lib

```
import { Button } from '@cc/ghost-design-system';
```

</details>

# Ghost Design System - React Components library

[Demo](https://charlescoqueret.github.io/ghost-design-system/)

# To go further

## Basic Folder Structure

```
├── .storybook
├── src
│   ├── Components
|   |   ├── Atoms or Molecules or Organisms or Templates
|   |   |   ├── Example
|   |   |   |   ├── __tests__
|   |   |   |   |   └── Example.test.tsx
|   |   |   |   ├── Example.module.scss
|   |   |   |   ├── Example.stories.mdx
|   |   |   |   ├── Example.tsx
|   |   |   |   └── index.ts
|   |   |   └── index.ts
|   |   └── index.ts
|   └── index.ts
├── LICENSE
├── package.json
├── README.md
└── tsconfig.json
```

Once you have created your new component make sure you have exported it in the `src/components/index.ts` file. Doing so allows the component to be compiled.

```tsx
// src/components/index.ts
export \* from './MyComponent';
export \* from './SomeOtherComponent';
```

You can develop your new component using storybook as your playground. Once you have added the `.stories.tsx` file for you new component, you can run `yarn storybook` to start the service.

## Tests

```console
$ yarn test
```

Watch

```console
$ yarn test:watch
```

Coverage

```console
$ yarn test:coverage
```

## Prettier

```console
$ yarn format
```

Validate project formatting

```console
$ yarn format:check
```

## Lint

```console
$ yarn lint
```

Fix

```console
$ yarn lint:fix
```

## Storybook

```console
$ yarn storybook
```

Build storybook

```console
$ yarn build-storybook
```

## Building your library

```console
$ yarn build
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

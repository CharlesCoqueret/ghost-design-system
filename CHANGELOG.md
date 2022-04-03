# Changelog

## 1.2.0 (2022-04-04)

### Features

- Adding scss prefix to all top level classes
- Atoms/Select extending IOption to support number values
- Organisms/DataTable Activate ellipsis for text columns
- Organisms/DataTable Give the ability to hide a column (from the header, body to footer)
- Organisms/EditableDataTable Add icon to no data state
- Organisms/FileField Add file counter when there is a restriction
- Organisms/Form Adding DynamicSearchField
- Organisms/LineEdiatableDataTable Add icon to no data state
- Organisms/LineEdiatableInPlaceDataTable Add icon to no data state
- Organisms/LineEditableDataTable Add ability to have additional buttons in the modal
- Organisms/LineEditableDataTable Adding DynamicSearch to columns
- Organisms/LineEditableDataTable offer a way to set the action column width
- Organisms/LineEditableDataTable offer the ability to enable the side by side
- Organisms/LineEditableDataTable offer the ability to set a modal title
- Organisms/RichTextField Component creation
- Organisms/StaticDataTable Add icon to no data state
- Organisms/TextAreaCell Adding ability to have textarea inside data table

### Bug Fixes

- Atoms/RichTextInput crash when none of link and image are enabled
- Import of the specific component instead of all of atoms or molecules
- Molecules/Button adds keys for optimized rendering of button menu entries
- Organisms/EditableDataTable Give the ability to override with empty string localization
- Organisms/Form fix typo in FieldTypeEnum for textarea
- Organisms/LineEditableDataTable Give the ability to override with empty string localization
- Organisms/LineEditableDataTable When line is being edited in the modal, it should not be rendered as an editable in place line.
- Organisms/LineEditableDataTable remove free hanging ;
- Organisms/LineEditableInPlaceDataTable Give the ability to override with empty string localization
- Organisms/RichTextField disable highlight
- Organisms/StaticDataTable Give the ability to override with empty string localization
- Organisms/StaticDataTable ensure the footer of the table is only present when the total is required
- Organisms/StaticDataTable ensure the total can be localized
- Organisms/StaticDataTable fix CustomCell to display forced value when it is defined

## 1.1.0 (2022-03-31)

### Features

- Organisms/FileField component creation
- Atoms/RichTextInput component creation

### Bug Fixes

- Atoms/AmountInput fix border color which was changing when in error and being hovered
- Atoms/CheckboxInput fix cursor to default when in readonly of disabled
- Atoms/SwitchInput fix cursor to be a point when input is editable, and default when in readonly or disabled
- Atoms/DatePickerInput fix story using locale
- Organisms/DatePickerField fix story using locale

## 1.0.2 (2022-03-27)

### Bug Fixes

- Build fix

## 1.0.1 (2022-03-27)

### Bug Fixes

- Build fix

## 1.0.0 (2022-03-27)

### Features

- Accessing the colors from the scss. Mecanics to be replicated in the app consuming the service
- Adding border to MultiSelectInput when disabled, and removing the entry deletion button when disabled
- Adding github build
- Adding missing addons to have controls enable on storybook
- Adding rowIndex to:, closes [#4](https://github.com/charlescoqueret/ghost-design-system/issues/4)
- Atoms/AmountInput creation
- Atoms/ChecboxInput - creation
- Atoms/CheckboxInput - update is now a fully controlled component
- Atoms/Col component creation
- Atoms/Colors
- Atoms/DatePickerInput - creation
- Atoms/DatePickerInput & Atoms/YearPickerInput updating buttons
- Atoms/DatePickerInput updating buttons
- Atoms/Layout offering style as parameter
- Atoms/Layout/Collapse Component creation
- Atoms/Link component creation (for internal and external links)
- Atoms/Modal new modal component
- Atoms/MultiSelectInput enabling color configuration with fallback to corporate theme
- Atoms/Portal component creation (creating a div independent from the current dom which is released once unmounted)
- Atoms/Section component creation (recycling collapse)
- Atoms/Select Making clearable optional
- Atoms/SwitchInput - creation
- Atoms/TextInput Adding story
- Atoms/Tooltip Replacing component to support the close on click (removing dependency on react-popper-tooltip)
- Atoms/Typography new components Text and Title
- Molecules/Button Adding popover to confirm action button
- Molecules/DynamicSearchField component creation
- Molecules/Popover component creation
- Molecules/Select Making clearable optional
- Organisms/ActionBar Adding back icon, badges, multilevel action bar
- Organisms/Actionbar minimal implementation
- Organisms/ActionBar review edition of title and avoid overflow of back button
- Organisms/ActionBar review edition of title and avoid overflow of back button
- Organisms/Form dynamic options for select, multiselect
- Organisms/Form provide a programmatic way to hide every single field, section or description (via boolean or conditionned by current data)
- Organisms/LineEditableDataTable adding the download button and its callback
- Organisms/LineEditableDataTable buttons are now build in the component
- Organisms/Navbar creating component
- Organisms/StaticDataTable adding the ability to prevent selection of a row.
- Organisms/StaticDataTable allow width size control at the column level
- Organisms/StaticDataTable provide dynamic options for badges base on the current row values.

### Bug Fixes

- Adding build capability with css, scss and minified css.
- Adding key to Fragment to avoid warnings
- Adding key to Icons to avoid warnings (collision between square)
- Atoms/AmountInput preventif white space wrap for currency display, especially in staticdatatable
- Atoms/Layout Section are getting simple and working when clicked very quickly
- Atoms/Modal fixing modal display when X and Y scroll are enabled on body.
- Atoms/Multiselect issue when selecting an option and trying to click outside (which was not closing option menu)
- Atoms/MultiSelectInput fix story
- Atoms/Tooltip Adjusting the algorithm to prefer in order: prefered direction, opposite to prefered direction, any fitting direction
- Atoms/Tooltip Removing excessive arrow presence compensation
- Atoms/Tooltip replace the base tooltip component and deploying it with the buttons and the staticdatatable
- Atoms/Typography.Text adding highlight and disabled
- Atoms/Typography.Title fixing type issue
- broken text after deleting line
- Button fixing spinning icon on loading state
- Cleaning typescript configuration
- color management end formatting with testing.
- fix test
- justify-content: end requires -webkit-justify-content: flex-end for webkit (safari) support
- Organism/StaticDataTable Adjusting disabled checkbox color
- Organisms/ActionBar fix overflow approach (leaving badge and title as long as possible and overflowing other elements)
- Organisms/ActionBar: Adding padding for the shadow title to fit title size
- Organisms/EditableDataTable Adding tests and associated fixes
- Organisms/EditableDataTable removing action column when not needed
- Organisms/Formfield multiselect old value correction
- Organisms/LineEditableDataTable reverting to initial snapshot value when modification has been cancelled
- Organisms/LineEditableInPlaceDataTable component renamed from LineEditableDataTable
- Organisms/Molecules Standardize naming for label in the dropdown entries of buttons
- Organisms/Navbar static image deployment
- Organisms/SideBar component creation
- Organisms/StaticDataTable adjusting colors of the checkbox
- Organisms/StaticDataTable cleaning up types
- Organisms/StaticDatatable Standardize cells using the buttons
- Organisms/useForm fixing story
- remove circular dependency
- Remove unused import
- Removing prefix to package name
- Removing private entry from package.json
- Throw error on warning when building with rollup
- update .gitignore
- Updating lincense

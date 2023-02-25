# Changelog

## 1.4.10 (2023-02-25)

Co-authored-by: @renv118

### Breaking changes

Organism/NavBar transform the customSubItem to customInfiinitScrollConfig to support infinite scroll
Organism/NavBar remove support for SearchBar

### Features

Add export IGenericFieldProps
Atoms/FileInput Add onFailure to manage the recently failed uploaded file
Atoms/FileInput Add onSuccess to manage the recently successfully uploaded file
Atoms/FileInput Add optional id to the be used by the library (separate from the uid)
Atoms/FileInput show a - when in ready only without any uploaded files
Molecules/Button prevent menu interactions when the button is disabled
Molecules/Button show default cursor on disabled button
Molecules/Toaster add Toaster component
Molecules/Toaster add ability to dismiss a toaster or all toasters
Molecules/Toaster add notify, success, error, persistent error
Molecules/Toaster add shadow to toaster
Organism/NavBar split into NavBar, NavBarBrand, NavBarMenu, NavBarUtilities
Organisms/ActionBar provide the ability to update the title even after rendering
Organisms/DataTable Add Tooltip fo the column title
Organisms/DataTable provide a way to make the header sticky/floating whenever scrolling
Organisms/Datatable spread fieldClassName for DatePickerField from LineEditableDataTable
Organisms/Form add rehydrate function to update the initialData in the useForm
Organisms/Form add support for editable datatable
Organisms/NavBar Adding customInfinitScrollConfig to support infinite scroll
Organisms/NavBar Adding link to the NavItemProps
Organisms/NavBar Adding tooltip to the NavItemProps
Organisms/NavBar restore customSubItem
Template/Portfolio provide a way to make the table header sticky/floating whenever scrolling
Templates/portfolio component creation

### Bug fixes

Atom/DatePickerInput disable click trap around the date when in readOnly of disabled mode
Atom/YearPickerInput disable click trap around the date when in readOnly of disabled mode
Atoms/AmountInput ensure changes originated from the props do not trigger onChange callback
Atoms/AmountInput remove unnecessary format in readOnly
Atoms/DatePickerInput prevent click event from bubbling up (especially when in a clickable row in a datatable)
Atoms/DatePickerInput remove position relative from css class .react-datepicker\_\_input-container
Atoms/DatePicketInput Set '-' as placeholder when input is empty and in readOnly or disabled
Atoms/DynamicSearchCreatableInput Handle readOnly and disabled the same way
Atoms/DynamicSearchInput Handle readOnly and disabled the same way
Atoms/FileInput Remove useCallback on addFileLocalItems as it might prevent check of max files
Atoms/FileInput display progress bar even when progress is at 0%
Atoms/FileInput handle file upload in batch as the state is only updated at the end of the upload.
Atoms/FileInput handle upload of items via drag'n drop.
Atoms/FileInput remove all useCallback
Atoms/FileInput remove the sort by uid of file, keep the natural order.
Atoms/Icon add a few icons used by legacy lib.
Atoms/Section Get back to react-collapsed 3.3.2 to avoid react 18 required.= with useId feature.
Atoms/SelectInput Handle readOnly and disabled the same way
Atoms/TextAreaInput Set '-' as placeholder when input is empty and in readOnly or disabled
Atoms/TextAreaInput fix the size management of textarea, even in read only.
Atoms/TextAreaInput height in readonly
Atoms/TextInput Set '-' as placeholder when input is empty and in readOnly or disabled
Atoms/YearPicketInput Set '-' as placeholder when input is empty and in readOnly or disabled
Molecules/Button Remove style for links inside menu
Molecules/FileField Handle management of file counter properly (not only with input length, but with current state)
Molecules/Popover specify for popover its own portal root id
Molecules/RichTextField Remove padding in readonly and disabled
Molecules/Toaster align closing icon for persistent toaster
Organisms/ActionBar Ensure the Title subcomponent is supporting updates of the onTitleChange callback
Organisms/ActionBar Extending the width for title
Organisms/ActionBar Make the whole item in menu clickable (not only the text)
Organisms/ActionBar fix width configuration of title
Organisms/ActionBar prevent selection of the "shadowed" title
Organisms/ActionBar set height of primary bar to 64px
Organisms/Datatable fix naming
Organisms/FileField Make requestUrl and requestMethod optional
Organisms/FileField Remove serverResponse from IFile as it must be handled in onSuccess
Organisms/FileField Remove unnecessary name
Organisms/Filter set buttons of the filter bar to reversed
Organisms/Form ensure highlighter has the original extras
Organisms/Form fix access to oldData for tables
Organisms/Form fix typo in type definition
Organisms/Form support highlighter with empty previousData for data table
Organisms/NavBar Rename link with redirection for brand link
Organisms/NavBar Use MenuItem instead of NavLink inside the menu
Organisms/NavBar adding missing keys
Organisms/NavBar fix label management for links
Organisms/NavBar fix link to display flex
Organisms/NavBar forcing the icon to fit with a max height of 44px
Organisms/NavBar remove all effect anchor link css inside the navbar
Organisms/NavBar update brand icon margin
Organisms/Navbar Ensure links are centered
Organisms/Navbar adjusting the link of items
Organisms/Tooltip Handling default values
Organisms/useForm remove strict from yup validation
Template/Portfolio css margin
Templates/Portfolio wrapping the Portfolio inside a QueryClientProvider and offering a PortfolioWrapped in case you need to use your own QueryClientProvider.

## 1.4.9 (2022-07-23)

### Features

- Add support for react 17
- Molecules/PercentageField handle division by 100 et multiply by 100 for input.
- Organisms/Form Provide a way to enable old data in the side by side view.
- Organisms/useForm add formProps to the useForm method
- Organisms/useForm add onChangeNotification to the useForm

### Bug Fixes

- BREAKING-CHANGE: typo collapsible instead of collapsable
- Atoms/Modal Remove the separator of the header and footer
- Atoms/Section ensure section collapsible can be disabled
- Organisms/ActionBar enable renameTooltip for translation
- Organisms/ActionBar fix action button margin to the right
- Organisms/ActionBar give 1px margin to prevent offsetWidth rounding to cause ellipsis.
- Organisms/DataTable use suffix and prefix for amountCells (instead of currency)
- Organisms/Form fix customfield using React.FunctionComponent signature
- Organisms/Form fix customfield using inputvalue instead of value
- Organisms/Form use memo on Form, FormField, Highlighter

## 1.4.8 (2022-06-11)

### Features

- Organisms/DataTable add the ability to specify the style for all body rows of a table
- Organisms/Form provide a way to enable side by side, even when previousData is not defined.
- Organisms/SideBar use react-router-dom 5.x until react-router-dom 6.x support of [Prompt](https://reactrouter.com/docs/en/v6/upgrading/v5#prompt-is-not-currently-supported)

### Bug Fixes

- Atoms/CheckboxInput ensure options has a fallback value ( = [] )
- Atoms/Section use react-collapsed to support the dynamic sizing of the content
- Organisms/Form remove highlight property from Highlighter (as it is no longer necessary with enableSideBySide property
- Organisms/SideBar adjust alpha on active link from 33% to 15%
- Organisms/SideBar adjust margin-left from 20px to 10px for items
- Organisms/SideBar adjust default sideBar width from 270px to 250px

## 1.4.7 (2022-05-20)

### Bug Fixes

- Organisms/SideBar scss should only transition left and visibility instead of all
- Organisms/SideBar use stretch instead of fill-available scss
- Organisms/Datatable ensure the gutter column is displayed when total or select are displayed

## 1.4.6 (2022-05-08)

### Features

- Organisms/SideBar simplified interface using component instead of props
- Organisms documentation

### Bug Fixes

- Atoms/AmountInput support value 0 as a valid value
- Organisms/ActionBar allow use of icon in action button
- Organisms/DataTable ensure only editable row are editable
- Organisms/Filter add scss prefix to container class

## 1.4.5 (2022-04-26)

### Features

- Organisms/DataTable add Description cell
- Organisms/DataTable add File cell
- Organisms/DataTable add Multiselect cell
- Organisms/DataTable add RichText cell
- Organisms/DataTable add Section cell
- Organisms/DataTable add Switch cell
- Organisms/DataTable add Table cell
- Organisms/DataTable add Year cell

### Bug Fixes

- Atoms/FileInput disable tabindex on drop area, as it is not interactive
- Atoms/FileInput disable tabindex on the hidden input of type file
- Atoms/SelectInput Adjusting the input border color
- Hooks/useWindowSize remove no longer used hook
- Organisms/DataTable and Organisms/Form use a uniform custom component signature

## 1.4.4 (2022-04-20)

### Bug Fixes

- CSS height: fill-available => height: stretch
- CSS justify-content:end => justify-content:flex-end
- Organisms/ActionBar fixing box shadow to avoid spilling over header
- Organisms/Sidebar removing useNavigate
- Third party css import url

## 1.4.3 (2022-04-14)

### Bug Fixes

- Build fix

## 1.4.2 (2022-04-14)

### Features

- Atoms/Tooltip replace custom tooltip with tippyjs

### Bug Fixes

- Atoms/Modal replacing overflow: scroll by overflow: auto (to avoid windows to show its scroll bar)
- Atoms/Typography removes display: inline=block (causing small margin at the bottom)
- Moving fortawesome to bundled dependencies

## 1.4.1 (2022-04-13)

### Bug Fixes

- Atoms/DatePickerInput stop propagation onClickoutside
- Atoms/DynamicSearchCreatableInput supporting controlled method (reset from the input, set from the input, ...)
- Atoms/DynamicSearchInput supporting controlled method (reset from the input, set from the input, ...)
- Atoms/YearPickerInput stop propagation onClickoutside
- Molecules/Field add overflow hidden for filter
- Organisms/Filter set search field of the bar flex grow 1 and flex shrink 1
- Organisms/FilterItem enable portal for date picker
- hooks/useOnClickOutside now check if the dom target is in the ref and if the x y coordinates are inside the area of the object

## 1.4.0 (2022-04-12)

### Features

- Atoms/CheckboxInput adds ability to check checkbox with space
- Atoms/CheckboxInput adds accessibility element
- Atoms/CheckboxInput give tabing access to the checkbox
- Atoms/CheckboxInput introducing inline checkbox
- Atoms/DynamicSearchCreatableInput enable initial search with no value typed
- Atoms/DynamicSearchInput enable initial search with no value typed
- Atoms/FileField set progress bar and file size as enabled by default
- Atoms/FileInput Add spinner while downloading a file
- Atoms/FileInput give tabing access to the file upload
- Atoms/FileInput set progress bar and file size as enabled by default
- Atoms/Icon Replacing spinner with custom spinner icon
- Atoms/Layout revamp row, col to manage spacing and section management
- Atoms/Pulsar component creation
- Atoms/RichTextInput disable tab inside the rich text box
- Atoms/RichTextInput updating table icons: delete, expended columns, reduce columns, fixed width and table header
- Atoms/Section making the separator optional, so it can be disabled for filter modal
- Atoms/SwitchInput adds ability to flip switch with space
- Atoms/SwitchInput adds accessibility element
- Atoms/SwitchInput give tabing access to the switch
- Organisms/Filter component creation
- Organisms/Filter introduce the title and column to replace the section filtertype to get more flexibility

### Bug Fixes

- Atoms/AmountInput Avoid overflow of text with ellipsis
- Atoms/AmountInput Avoid word wrapping
- Atoms/AmountInput using single string in readonly mode instead of concatenated strings
- Atoms/Badge remove font-weight
- Atoms/Checkbox centering the checkboxes when inline
- Atoms/Checkbox remove padding bottom on the last label o the list
- Atoms/CheckboxInput Use padding instead of margin
- Atoms/FileInput managing new field classname
- Atoms/FileInput update gallery hover color
- Atoms/GenericField fixing inline mode
- Atoms/Inputs Removing all field size
- Atoms/RichText adding white background to the sticky toolbar in case of small screen
- Atoms/RichTextInput enabling the character counter box with transparent background
- Atoms/RichTextInput remove h4 h5 h6, adjust font sizes from 10px to 22px, adjust the min height to 250px
- Atoms/RichTextInput removing the incorrect character counter from the generic field
- Atoms/RichTextInput removing zindex for the wrapper and toolbar, and hiding the sticky toolbar
- Atoms/TextAreaInput remove initial size which was varying at the first key stroke
- Atoms/Tooltip Remove use of screen availwidth/availheight to the benefit of document.body.clientwidth/clientheight in case of iframe (such as in storybook)
- Atoms/Typography use title attribute instead of tooltip (for performance reason)
- Organisms/Fields removing overflow
- Organisms/Fields set a minimum width of 50px
- Organisms/Form disabling portal for select, multiselect, dynamic search and dynamic search creatable (keeping it only for datepicker and year picker)
- Organisms/LineEditableDatable disabling portal for forms (only date picker and year picker)
- Setting h1 font weight to 400

## 1.3.0 (2022-04-07)

### Features

- Atoms/AmountInput Adding ellipsis with tooltip feature in readonly for non format type
- Atoms/DynamicSearchCreatableInput Adding custom magnifier as dropdown indicator and clear indicator
- Atoms/DynamicSearchCreatableInput Adding ellipsis with tooltip feature in readonly mode
- Atoms/DynamicSearchInput Adding custom magnifier as dropdown indicator and clear indicator
- Atoms/DynamicSearchInput Adding ellipsis with tooltip feature in readonly mode
- Atoms/MultiSelectInput Adding custom dropdown indicator and clear indicator
- Atoms/MultiSelectInput Adding ellipsis with tooltip feature in readonly mode
- Atoms/SelectInput Adding custom dropdown indicator and clear indicator
- Atoms/SelectInput Adding ellipsis with tooltip feature in readonly mode
- Atoms/TextInput Adding ellipsis with tooltip feature in readonly
- Atoms/Tooltip Adding ability to disable the tooltip for the ellipsis use case
- Atoms/Typography Give the ability to show tooltip when the text is ellipsed
- Organisms/LineEditableDataTable Add console.error for errors of incorrect type.
- Organisms/LineEditableDataTable provide the ability to customize the title of the edition modal based on the row data
- Organisms/LineEditableDataTable provide the ability to hide a field in the form
- Organisms/useForm adding scroll into view of errors when submitting

### Bug Fixes

- Atoms/DynamicSearchCreatableInput prevent scroll with the dropdown open
- Atoms/DynamicSearchInput prevent scroll with the dropdown open
- Atoms/MultiselectInput prevent scroll with the dropdown open
- Atoms/RichtextInput ensure the font is defined evrywhere
- Atoms/Section Fix initial height then collapsing and open initially
- Atoms/SelectInput prevent scroll with the dropdown open
- Atoms/TextArea forcing initial height to the maximum height reachable for the content
- Atoms/modal removing the zindex of the modal
- Fields reducing padding bottom to 4px
- Fix fields separations from 20px to 8px (4px on top and bottom)
- Organisms/CheckboxCell provide the ability to disable edition on that column
- Organisms/DataTable consider the hidden column for the no data element and the loading element
- Organisms/DataTable do not show "no data" while loading data
- Organisms/EditableDataTable ensure column and row are editable (and not only row)
- Organisms/LineEditableDataTable use portal in the modal for select

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

# Changelog

## 1.1.0 (2022-03-31)

### Features

- Organisms/FileField component creation ([4ab8772b](https://github.com/CharlesCoqueret/ghost-design-system/commit/4ab8772bf3f753c7f63f49507edfac1e9a83f9f1))
- Atoms/RichTextInput component creation ([51e36b02](https://github.com/CharlesCoqueret/ghost-design-system/commit/51e36b02905a052457fd93a38236233fcd638fe6))

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

- Accessing the colors from the scss. Mecanics to be replicated in the app consuming the service. ([90130c0](https://github.com/charlescoqueret/ghost-design-system/commit/90130c0b56e665e35984b54f1647beb82a852932))
- Adding border to MultiSelectInput when disabled, and removing the entry deletion button when disabled ([d73a0d8](https://github.com/charlescoqueret/ghost-design-system/commit/d73a0d8c9a6684f608dc1293949627fa4611a094))
- Adding github build ([7d6d0d0](https://github.com/charlescoqueret/ghost-design-system/commit/7d6d0d05a52f5e7d9ca68607b587d4b4d3783ee5))
- Adding missing addons to have controls enable on storybook ([50e1e45](https://github.com/charlescoqueret/ghost-design-system/commit/50e1e45691eb3837aebbd6f0c84dc842036f7d81))
- Adding rowIndex to: ([ea463a0](https://github.com/charlescoqueret/ghost-design-system/commit/ea463a0aa5953e4332db4423693f4f708820898f)), closes [#4](https://github.com/charlescoqueret/ghost-design-system/issues/4)
- Atoms/AmountInput creation ([f37c035](https://github.com/charlescoqueret/ghost-design-system/commit/f37c0352cde134e43e8d0cf16c7943121f5208dd))
- Atoms/ChecboxInput - creation ([cec15dd](https://github.com/charlescoqueret/ghost-design-system/commit/cec15ddbb670ead32ab2e7c1c89034313b537543))
- Atoms/CheckboxInput - update is now a fully controlled component ([6319a77](https://github.com/charlescoqueret/ghost-design-system/commit/6319a7733e98448346a6352514a827447061fd52))
- Atoms/Col component creation ([2d5d934](https://github.com/charlescoqueret/ghost-design-system/commit/2d5d9349c8073259006edb907fc4259fed1a92d3))
- Atoms/Colors ([e8e26fe](https://github.com/charlescoqueret/ghost-design-system/commit/e8e26fe618c538aaff8fc75aae9fe987a3027396))
- Atoms/DatePickerInput - creation ([21c4604](https://github.com/charlescoqueret/ghost-design-system/commit/21c4604078d53778e385cca1a9ff6dc08a12352b))
- Atoms/DatePickerInput & Atoms/YearPickerInput updating buttons ([0981f73](https://github.com/charlescoqueret/ghost-design-system/commit/0981f731b3381d7d3a263d57f47ecb3f782805e5))
- Atoms/DatePickerInput updating buttons ([97e7f98](https://github.com/charlescoqueret/ghost-design-system/commit/97e7f98a3f56e04d6b741ccce78266921ad437d6))
- Atoms/Layout offering style as parameter ([43214bb](https://github.com/charlescoqueret/ghost-design-system/commit/43214bb0295c75d6383959364dac0fd37a1c180d))
- Atoms/Layout/Collapse Component creation ([c037f20](https://github.com/charlescoqueret/ghost-design-system/commit/c037f204a5d76c1759d0b71797b6099b579f2acc))
- Atoms/Link component creation (for internal and external links) ([a536170](https://github.com/charlescoqueret/ghost-design-system/commit/a536170d2368acc020521dbb67a752d55b433932))
- Atoms/Modal new modal component ([acc264b](https://github.com/charlescoqueret/ghost-design-system/commit/acc264bab175b6998caf3336d41b5fbd77ba726d))
- Atoms/MultiSelectInput enabling color configuration with fallback to corporate theme ([37667b1](https://github.com/charlescoqueret/ghost-design-system/commit/37667b1da94d09df4004c8b62f54fbd6e3eda096))
- Atoms/Portal component creation (creating a div independent from the current dom which is released once unmounted) ([77e390f](https://github.com/charlescoqueret/ghost-design-system/commit/77e390ff72f15b10aa12861cf160df74070f464c))
- Atoms/Section component creation (recycling collapse) ([50529d5](https://github.com/charlescoqueret/ghost-design-system/commit/50529d598e1c84feb9a71f7a96db0427ab0ac89d))
- Atoms/Select Making clearable optional ([7ef10ba](https://github.com/charlescoqueret/ghost-design-system/commit/7ef10ba8ef7c49eed43e9e07ba0d7694328b9f5e))
- Atoms/SwitchInput - creation ([6d156ce](https://github.com/charlescoqueret/ghost-design-system/commit/6d156cefcbd1ec16e09d23e9a906e08826f78ec3))
- Atoms/TextInput Adding story ([cab1620](https://github.com/charlescoqueret/ghost-design-system/commit/cab1620abbebaac889157075b088ebf6845fff09))
- Atoms/Tooltip Replacing component to support the close on click (removing dependency on react-popper-tooltip) ([03c8a97](https://github.com/charlescoqueret/ghost-design-system/commit/03c8a97aa0ec9ff55444f5a845080c54e454d547))
- Atoms/Typography new components Text and Title ([1ad6d30](https://github.com/charlescoqueret/ghost-design-system/commit/1ad6d30be91d6f74cf3d69a981f7193618d79dca))
- Molecules/Button Adding popover to confirm action button ([d0c55ce](https://github.com/charlescoqueret/ghost-design-system/commit/d0c55ce2487fe12f12250f90c9117c09c8caf536))
- Molecules/DynamicSearchField component creation ([d69f12d](https://github.com/charlescoqueret/ghost-design-system/commit/d69f12d6737c70d702ada652aa462cf9f45ee488))
- Molecules/Popover component creation ([5ad2fb4](https://github.com/charlescoqueret/ghost-design-system/commit/5ad2fb4c515ebacf22c7385c0899c5727c32dd83))
- Molecules/Select Making clearable optional ([8f624b6](https://github.com/charlescoqueret/ghost-design-system/commit/8f624b655fbb5c912306a2eeeda4b916febe7cb7))
- Organisms/ActionBar Adding back icon, badges, multilevel action bar ([f339599](https://github.com/charlescoqueret/ghost-design-system/commit/f3395997aa31ef117c379c5922e538f1f808692a))
- Organisms/Actionbar minimal implementation ([e369525](https://github.com/charlescoqueret/ghost-design-system/commit/e36952588b90f37b304a2f375798cd07a308604a))
- Organisms/ActionBar review edition of title and avoid overflow of back button ([08087dc](https://github.com/charlescoqueret/ghost-design-system/commit/08087dcb12a9c3203cf0450015d730bd9945ad4a))
- Organisms/ActionBar review edition of title and avoid overflow of back button ([4876320](https://github.com/charlescoqueret/ghost-design-system/commit/4876320813df279caae5ada6d95383b938b8412a))
- Organisms/Form dynamic options for select, multiselect ([1c6e962](https://github.com/charlescoqueret/ghost-design-system/commit/1c6e962acc52ee3355225b99d83833b5cb0efe1f))
- Organisms/Form provide a programmatic way to hide every single field, section or description (via boolean or conditionned by current data) ([36e582d](https://github.com/charlescoqueret/ghost-design-system/commit/36e582dce2610b4b36fc11c3ccfe8cafeb3e1042))
- Organisms/LineEditableDataTable adding the download button and its callback ([f598fa7](https://github.com/charlescoqueret/ghost-design-system/commit/f598fa76f065cac19fa1086824922edeef2cf0ca))
- Organisms/LineEditableDataTable buttons are now build in the component ([93502a3](https://github.com/charlescoqueret/ghost-design-system/commit/93502a3f5d51f2d390a3f3eb84523d5d3cf6af95))
- Organisms/Navbar creating component ([bac5cb5](https://github.com/charlescoqueret/ghost-design-system/commit/bac5cb51efe850b4a68fa793084d11ddea242120))
- Organisms/StaticDataTable adding the ability to prevent selection of a row. ([addb1fa](https://github.com/charlescoqueret/ghost-design-system/commit/addb1fa6ea6dbcd139146f391b3697e903a44c2f))
- Organisms/StaticDataTable allow width size control at the column level ([9e6a06e](https://github.com/charlescoqueret/ghost-design-system/commit/9e6a06e411cf28cee8f2ea76a76c9447a9b7368b))
- Organisms/StaticDataTable provide dynamic options for badges base on the current row values. ([d3137a4](https://github.com/charlescoqueret/ghost-design-system/commit/d3137a4e78fa558554b31f4c404fd2c58ed694f4))

### Bug Fixes

- Adding build capability with css, scss and minified css. ([d66afa3](https://github.com/charlescoqueret/ghost-design-system/commit/d66afa336759815b435b143dc1730e21fa6865c6))
- Adding key to Fragment to avoid warnings ([a824f67](https://github.com/charlescoqueret/ghost-design-system/commit/a824f67c83cd670f1f07494c08c90e9aaeb31240))
- Adding key to Icons to avoid warnings (collision between square) ([4a2853a](https://github.com/charlescoqueret/ghost-design-system/commit/4a2853ab7c58e22c2652eb47dcc8e6b023f71710))
- Atoms/AmountInput preventif white space wrap for currency display, especially in staticdatatable ([ae429fe](https://github.com/charlescoqueret/ghost-design-system/commit/ae429fe0993dbe975201d98a94ea248fb32ff13d))
- Atoms/Layout Section are getting simple and working when clicked very quickly ([8a1259a](https://github.com/charlescoqueret/ghost-design-system/commit/8a1259a82ffb555b3f44d0571fb67085aa2dfd3f))
- Atoms/Modal fixing modal display when X and Y scroll are enabled on body. ([20b021f](https://github.com/charlescoqueret/ghost-design-system/commit/20b021f8e96e5a7e13d8c5e596c6b40f65019e20))
- Atoms/Multiselect issue when selecting an option and trying to click outside (which was not closing option menu) ([ce2eb36](https://github.com/charlescoqueret/ghost-design-system/commit/ce2eb3663856b568175276aeafa1b924f6b7d359))
- Atoms/MultiSelectInput fix story ([f138a63](https://github.com/charlescoqueret/ghost-design-system/commit/f138a635760e8aa28dec0ef0ed88c8908422ce1e))
- Atoms/Tooltip Adjusting the algorithm to prefer in order: prefered direction, opposite to prefered direction, any fitting direction ([f7eab85](https://github.com/charlescoqueret/ghost-design-system/commit/f7eab85043a41fe15157dc5148a0fcc63662925f))
- Atoms/Tooltip Removing excessive arrow presence compensation ([3ee09bb](https://github.com/charlescoqueret/ghost-design-system/commit/3ee09bbf9a3c334766fd5c13c346a97f813dbaa9))
- Atoms/Tooltip replace the base tooltip component and deploying it with the buttons and the staticdatatable ([46b8cf3](https://github.com/charlescoqueret/ghost-design-system/commit/46b8cf32418ae2ff25c65d6ff9406c73a96dac10))
- Atoms/Typography.Text adding highlight and disabled ([a435099](https://github.com/charlescoqueret/ghost-design-system/commit/a43509997f796345fe3fe5360759064b60b31d74))
- Atoms/Typography.Title fixing type issue ([f17a84e](https://github.com/charlescoqueret/ghost-design-system/commit/f17a84e8e0a716d53eae00b65155c0b552101906))
- broken text after deleting line ([f69c84a](https://github.com/charlescoqueret/ghost-design-system/commit/f69c84ace431bc575caa8d5307588666c3227a24))
- Button fixing spinning icon on loading state ([0559560](https://github.com/charlescoqueret/ghost-design-system/commit/0559560561de903efa987cafc5f9109f2ece9b41))
- Cleaning typescript configuration ([2a01457](https://github.com/charlescoqueret/ghost-design-system/commit/2a01457b32dfbce994181dcd68ec10474e926753))
- color management end formatting with testing. ([a257687](https://github.com/charlescoqueret/ghost-design-system/commit/a2576874acd2def56d9e50c4908f0a2c8216163e))
- fix test ([26b2b58](https://github.com/charlescoqueret/ghost-design-system/commit/26b2b589c7536406992b66d91c14d378470ac75c))
- justify-content: end requires -webkit-justify-content: flex-end for webkit (safari) support ([55dad8c](https://github.com/charlescoqueret/ghost-design-system/commit/55dad8c4225e4650ec9202c5aec036e84851da3a))
- Organism/StaticDataTable Adjusting disabled checkbox color ([321b3d1](https://github.com/charlescoqueret/ghost-design-system/commit/321b3d1e653575d4524d0a4cd9880725fcdf1f6a))
- Organisms/ActionBar fix overflow approach (leaving badge and title as long as possible and overflowing other elements) ([171eb04](https://github.com/charlescoqueret/ghost-design-system/commit/171eb044cc362165d923404f9f3922bbbbd6af5a))
- Organisms/ActionBar: Adding padding for the shadow title to fit title size ([2ca1e91](https://github.com/charlescoqueret/ghost-design-system/commit/2ca1e91fa52c0fa7ac72b5e3afa1e460b928253c))
- Organisms/EditableDataTable Adding tests and associated fixes ([4f706e8](https://github.com/charlescoqueret/ghost-design-system/commit/4f706e8a54abf0d496bf8a7dcab21b8dd6c8ac13))
- Organisms/EditableDataTable removing action column when not needed ([9420d4a](https://github.com/charlescoqueret/ghost-design-system/commit/9420d4a6b9314fec49ddd1e289fd4f0e94361b26))
- Organisms/Formfield multiselect old value correction ([b76d117](https://github.com/charlescoqueret/ghost-design-system/commit/b76d117a4cecf3c18ecba409194216f97f0bf97b))
- Organisms/LineEditableDataTable reverting to initial snapshot value when modification has been cancelled ([1e3658d](https://github.com/charlescoqueret/ghost-design-system/commit/1e3658d356486d321ae92c0d7223604418a40dbc))
- Organisms/LineEditableInPlaceDataTable component renamed from LineEditableDataTable ([2307a82](https://github.com/charlescoqueret/ghost-design-system/commit/2307a8248235dad9ecc2b5df12dfdc1cd98fbc4a))
- Organisms/Molecules Standardize naming for label in the dropdown entries of buttons ([9605f94](https://github.com/charlescoqueret/ghost-design-system/commit/9605f94d583e0084e25d69de8b9162b7e5528436))
- Organisms/Navbar static image deployment ([3c4c6f3](https://github.com/charlescoqueret/ghost-design-system/commit/3c4c6f391f3b712b41dd66ece6e9d4b58b55e2cc))
- Organisms/SideBar component creation ([7728d39](https://github.com/charlescoqueret/ghost-design-system/commit/7728d391987cf07d6fb2300f3b606af7a632738a))
- Organisms/StaticDataTable adjusting colors of the checkbox ([6b53af9](https://github.com/charlescoqueret/ghost-design-system/commit/6b53af95b83777c3715e72ecc369c8449af0f2e2))
- Organisms/StaticDataTable cleaning up types ([f8b5f7e](https://github.com/charlescoqueret/ghost-design-system/commit/f8b5f7e334a851e8e2c80fb7677d09100afaf3da))
- Organisms/StaticDatatable Standardize cells using the buttons ([b49f31b](https://github.com/charlescoqueret/ghost-design-system/commit/b49f31b49f1fecaa11640c4e48d775abe483b645))
- Organisms/useForm fixing story ([25b44f5](https://github.com/charlescoqueret/ghost-design-system/commit/25b44f5eb62221ab161155d237fb83fb99e26069))
- remove circular dependency ([c7d68b1](https://github.com/charlescoqueret/ghost-design-system/commit/c7d68b16e41d88a95899b5d287692928505d17e0))
- Remove unused import ([ef0ebac](https://github.com/charlescoqueret/ghost-design-system/commit/ef0ebacf9bc6543ef98876efdcbdcadf4b6eda92))
- Removing prefix to package name ([521175b](https://github.com/charlescoqueret/ghost-design-system/commit/521175b6d21c882e1432e3990ae03fddc2519514))
- Removing private entry from package.json ([a822fcc](https://github.com/charlescoqueret/ghost-design-system/commit/a822fcc6961754f9e4e79ef0593d060f236b4756))
- Throw error on warning when building with rollup ([d4ee3d7](https://github.com/charlescoqueret/ghost-design-system/commit/d4ee3d79b6eafcca8251bb9b9928e8622318ee77))
- update .gitignore ([62569c3](https://github.com/charlescoqueret/ghost-design-system/commit/62569c395e16242b5476a1caa8793cb002249d31))
- Updating lincense ([15befe4](https://github.com/charlescoqueret/ghost-design-system/commit/15befe45dfe2c5c226f9cc408c282980ff5fd4a5))

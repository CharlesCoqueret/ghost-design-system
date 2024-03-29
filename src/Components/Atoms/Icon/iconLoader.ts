import { dom, library } from '@fortawesome/fontawesome-svg-core';

import {
  faArrowDownToLine,
  faArrowLeft,
  faArrowsToLine,
  faArrowUpFromLine,
  faArrowsLeftRightToLine,
  faArrowCircleRight, // deprecated
  faBallotCheck,
  faBell,
  faBriefcase,
  faCalendarDay,
  faChartColumn,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faColumns3,
  faEllipsis,
  faExclamationTriangle,
  faExternalLink,
  faEye,
  faFileAlt,
  faFilter,
  faGear,
  faHighlighter,
  faInbox,
  faInfoCircle,
  faListOl,
  faListUl,
  faLoader,
  faLongArrowAltDown,
  faLongArrowAltLeft,
  faLongArrowAltUp,
  faMagnifyingGlass,
  faMessageExclamation,
  faMinus,
  faPaperclip,
  faPaperPlane,
  faPen,
  faPipe,
  faPlus,
  faQuestionCircle,
  faSave,
  faScaleBalanced,
  faSort as faSortLight, // deprecated
  faSquare as faSquareLight,
  faTable,
  faTextSize,
  faTimes,
  faTimesCircle,
  faTrashAlt,
  faUndo,
  faUserCircle,
  faUserLock,
  faUserUnlock,
  faWindowMaximize,
} from '@fortawesome/pro-light-svg-icons';

import {
  // Text editor
  faBold,
  faHorizontalRule,
  faImage,
  faIndent,
  faItalic,
  faLink,
  faOutdent,
  faPalette,
  faStrikethrough,
  faUnderline,
} from '@fortawesome/pro-regular-svg-icons';

// Button and checkbox
import {
  faCaretDown,
  faCircleCheck,
  faCircleXmark,
  faSquare,
  faSquareCheck,
  faSort,
  faSortDown,
  faSortUp,
} from '@fortawesome/pro-solid-svg-icons';

const loadIcons = (): void => {
  library.add(
    faArrowCircleRight,
    faArrowDownToLine,
    faArrowLeft,
    faArrowsLeftRightToLine,
    faArrowsToLine,
    faArrowUpFromLine,
    faBallotCheck,
    faBell,
    faBriefcase,
    faCalendarDay,
    faChartColumn,
    faCheck,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faColumns3,
    faMessageExclamation,
    faEllipsis,
    faExclamationTriangle,
    faExternalLink,
    faEye,
    faFileAlt,
    faFilter,
    faGear,
    faInbox,
    faInfoCircle,
    faLoader,
    faLongArrowAltDown,
    faLongArrowAltLeft,
    faLongArrowAltUp,
    faMagnifyingGlass,
    faMinus,
    faPaperclip,
    faPaperPlane,
    faPen,
    faPipe,
    faPlus,
    faQuestionCircle,
    faSave,
    faScaleBalanced,
    faSort,
    faSortLight,
    faSortDown,
    faSortUp,
    faSquareLight,
    faTimes,
    faTimesCircle,
    faTrashAlt,
    faUndo,
    faUserCircle,
    faUserLock,
    faUserUnlock,
    faWindowMaximize,

    // text editor
    faBold,
    faHighlighter,
    faHorizontalRule,
    faImage,
    faIndent,
    faItalic,
    faLink,
    faListOl,
    faListUl,
    faOutdent,
    faPalette,
    faStrikethrough,
    faTable,
    faTextSize,
    faUnderline,

    // button
    faCaretDown,
    faSquare,
    faSquareCheck,

    // toast
    faCircleXmark,
    faCircleCheck,
  );

  dom.watch();
};

export default loadIcons;

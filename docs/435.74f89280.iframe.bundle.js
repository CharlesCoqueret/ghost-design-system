(window.webpackJsonp=window.webpackJsonp||[]).push([[435],{"./node_modules/date-fns/locale/cs/_lib/formatRelative/index.js":function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function formatRelative(token,date,baseDate,options){var format=formatRelativeLocale[token];if("function"==typeof format)return format(date,baseDate,options);return format};var accusativeWeekdays=["neděli","pondělí","úterý","středu","čtvrtek","pátek","sobotu"],formatRelativeLocale={lastWeek:"'poslední' eeee 've' p",yesterday:"'včera v' p",today:"'dnes v' p",tomorrow:"'zítra v' p",nextWeek:function(date,_baseDate,_options){var day=date.getUTCDay();return"'v "+accusativeWeekdays[day]+" o' p"},other:"P"};module.exports=exports.default}}]);
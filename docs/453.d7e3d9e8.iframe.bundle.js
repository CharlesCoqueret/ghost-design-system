(window.webpackJsonp=window.webpackJsonp||[]).push([[453],{"./node_modules/date-fns/locale/eu/_lib/formatDistance/index.js":function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function formatDistance(token,count,options){var result;options=options||{},result="string"==typeof formatDistanceLocale[token]?formatDistanceLocale[token]:1===count?formatDistanceLocale[token].one:formatDistanceLocale[token].other.replace("{{count}}",count);if(options.addSuffix)return options.comparison>0?"en "+result:"duela "+result;return result};var formatDistanceLocale={lessThanXSeconds:{one:"segundo bat baino gutxiago",other:"{{count}} segundo baino gutxiago"},xSeconds:{one:"1 segundo",other:"{{count}} segundo"},halfAMinute:"minutu erdi",lessThanXMinutes:{one:"minutu bat baino gutxiago",other:"{{count}} minutu baino gutxiago"},xMinutes:{one:"1 minutu",other:"{{count}} minutu"},aboutXHours:{one:"1 ordu gutxi gorabehera",other:"{{count}} ordu gutxi gorabehera"},xHours:{one:"1 ordu",other:"{{count}} ordu"},xDays:{one:"1 egun",other:"{{count}} egun"},aboutXWeeks:{one:"aste 1 inguru",other:"{{count}} aste inguru"},xWeeks:{one:"1 aste",other:"{{count}} astean"},aboutXMonths:{one:"1 hilabete gutxi gorabehera",other:"{{count}} hilabete gutxi gorabehera"},xMonths:{one:"1 hilabete",other:"{{count}} hilabete"},aboutXYears:{one:"1 urte gutxi gorabehera",other:"{{count}} urte gutxi gorabehera"},xYears:{one:"1 urte",other:"{{count}} urte"},overXYears:{one:"1 urte baino gehiago",other:"{{count}} urte baino gehiago"},almostXYears:{one:"ia 1 urte",other:"ia {{count}} urte"}};module.exports=exports.default}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[457],{"./node_modules/date-fns/locale/fi/_lib/formatDistance/index.js":function(module,exports,__webpack_require__){"use strict";function futureSeconds(text){return text.replace(/sekuntia?/,"sekunnin")}function futureMinutes(text){return text.replace(/minuuttia?/,"minuutin")}function futureHours(text){return text.replace(/tuntia?/,"tunnin")}function futureWeeks(text){return text.replace(/(viikko|viikkoa)/,"viikon")}function futureMonths(text){return text.replace(/(kuukausi|kuukautta)/,"kuukauden")}function futureYears(text){return text.replace(/(vuosi|vuotta)/,"vuoden")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function formatDistance(token,count,options){options=options||{};var distance=formatDistanceLocale[token],result=1===count?distance.one:distance.other.replace("{{count}}",count);if(options.addSuffix)return options.comparison>0?distance.futureTense(result)+" kuluttua":result+" sitten";return result};var formatDistanceLocale={lessThanXSeconds:{one:"alle sekunti",other:"alle {{count}} sekuntia",futureTense:futureSeconds},xSeconds:{one:"sekunti",other:"{{count}} sekuntia",futureTense:futureSeconds},halfAMinute:{one:"puoli minuuttia",other:"puoli minuuttia",futureTense:function(_text){return"puolen minuutin"}},lessThanXMinutes:{one:"alle minuutti",other:"alle {{count}} minuuttia",futureTense:futureMinutes},xMinutes:{one:"minuutti",other:"{{count}} minuuttia",futureTense:futureMinutes},aboutXHours:{one:"noin tunti",other:"noin {{count}} tuntia",futureTense:futureHours},xHours:{one:"tunti",other:"{{count}} tuntia",futureTense:futureHours},xDays:{one:"päivä",other:"{{count}} päivää",futureTense:function futureDays(text){return text.replace(/päivää?/,"päivän")}},aboutXWeeks:{one:"noin viikko",other:"noin {{count}} viikkoa",futureTense:futureWeeks},xWeeks:{one:"viikko",other:"{{count}} viikkoa",futureTense:futureWeeks},aboutXMonths:{one:"noin kuukausi",other:"noin {{count}} kuukautta",futureTense:futureMonths},xMonths:{one:"kuukausi",other:"{{count}} kuukautta",futureTense:futureMonths},aboutXYears:{one:"noin vuosi",other:"noin {{count}} vuotta",futureTense:futureYears},xYears:{one:"vuosi",other:"{{count}} vuotta",futureTense:futureYears},overXYears:{one:"yli vuosi",other:"yli {{count}} vuotta",futureTense:futureYears},almostXYears:{one:"lähes vuosi",other:"lähes {{count}} vuotta",futureTense:futureYears}};module.exports=exports.default}}]);
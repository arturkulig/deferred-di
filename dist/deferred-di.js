(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["deferred-di"] = factory();
	else
		root["deferred-di"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";function pickDependencies(e,n){var r={};return e.forEach(function(e){if(!n[e])throw new Error(e+" cannot be resolved");r[e]=n[e]}),r}function resolveMap(e){var n=[],r=function(r){var t={key:r,promise:null,value:null};t.promise=e[r].then(function(e){t.value=e}),n.push(t)};for(var t in e)r(t);return Promise.all(n.map(function(e){return e.promise})).then(function(){var e={};return n.forEach(function(n){return e[n.key]=n.value}),e})}function resolveDependencies(){var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],n=arguments[1];if(0===e.length)return Promise.resolve({});try{return resolveMap(pickDependencies(e,n))}catch(r){return Promise.reject(r.message)}}function getInjector(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=function(n){return n(e)};return n.modules=e,n.clone=function(){return getClonedInjector(e)},n.then=function(n,r){return resolveMap(e).then(n,r)},n["catch"]=function(n){return resolveMap(e)["catch"](n)},n}function getClonedInjector(e){var n=_extends({},e);return getInjector(n)}function ddi(e,n,r){function t(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],o=resolveDependencies(n.split(",").filter(function(e){return!!e}).map(function(e){return e.trim()}),t);ddi.logger&&o["catch"](function(e){return ddi.logger.error(e)}),t[e]=o.then(function(e){return r(e)});var i=getInjector(t);return i}return"function"==typeof n&&(r=n,n=r.$inject||""),t}Object.defineProperty(exports,"__esModule",{value:!0});var _extends=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e};ddi.injector=ddi.inject=getInjector,ddi.logger=null,exports["default"]=ddi;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=deferred-di.js.map
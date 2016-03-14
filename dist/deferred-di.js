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

	"use strict";function pickDeps(e,n){return e.map(function(e){if(n[e])return n[e];throw new Error(e+" cannot be resolved")})}function resolveMap(e){var n=[],t=function(t){var r={key:t,promise:null,value:null};r.promise=e[t].then(function(e){return r.value=e}),n.push(r)};for(var r in e)t(r);return Promise.all(n.map(function(e){return e.promise})).then(function(){var e={};return n.forEach(function(n){return e[n.key]=n.value}),e})}function resolveDeps(e,n){if(0===e.length)return Promise.resolve([]);try{return Promise.all(pickDeps(e,n))}catch(t){return Promise.reject(t.message)}}function getInjector(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=function(n){return n(e)};return n.modules=e,n.clone=function(){return getClonedInjector(e)},n.then=function(n,t){return resolveMap(e).then(n,t)},n["catch"]=function(n){return resolveMap(e)["catch"](n)},n}function getClonedInjector(e){var n=_extends({},e);return getInjector(n)}function normalizeInjects(e){return"string"==typeof e?e.split(",").map(function(e){return e.trim()}).filter(function(e){return!!e}):"object"===("undefined"==typeof e?"undefined":_typeof(e))&&e instanceof Array?e:[]}function ddi(e,n,t){function r(){var n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=resolveDeps(o,n);return ddi.logger&&r["catch"](function(e){return ddi.logger.error(e)}),n[e]=r.then(function(e){return t.apply(null,e)}),getInjector(n)}var o=void 0;return"function"==typeof n?(t=n,o=normalizeInjects(t.$inject)):o=normalizeInjects(n),r}Object.defineProperty(exports,"__esModule",{value:!0});var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},_extends=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e};ddi.injector=ddi.inject=getInjector,ddi.logger=null,exports["default"]=ddi;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=deferred-di.js.map
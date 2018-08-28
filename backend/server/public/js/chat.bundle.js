/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/dev/js/chat/index.js":
/*!***************************************!*\
  !*** ./frontend/dev/js/chat/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _profile = __webpack_require__(/*! ./profile/profile.js */ \"./frontend/dev/js/chat/profile/profile.js\");\n\nvar _profile2 = _interopRequireDefault(_profile);\n\n__webpack_require__(/*! ../../less/chat/chat.less */ \"./frontend/dev/less/chat/chat.less\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//import \"../common/socket.io\";\n\nalert((0, _profile2.default)());//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kZXYvanMvY2hhdC9pbmRleC5qcz9jMDk4Il0sIm5hbWVzIjpbImFsZXJ0Il0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBS0E7Ozs7QUFKQTs7QUFFQUEsTUFBTSx3QkFBTiIsImZpbGUiOiIuL2Zyb250ZW5kL2Rldi9qcy9jaGF0L2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdldE5hbWUgZnJvbSBcIi4vcHJvZmlsZS9wcm9maWxlLmpzXCI7XG4vL2ltcG9ydCBcIi4uL2NvbW1vbi9zb2NrZXQuaW9cIjtcblxuYWxlcnQoZ2V0TmFtZSgpKTtcblxuaW1wb3J0IFwiLi4vLi4vbGVzcy9jaGF0L2NoYXQubGVzc1wiOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./frontend/dev/js/chat/index.js\n");

/***/ }),

/***/ "./frontend/dev/js/chat/profile/profile.js":
/*!*************************************************!*\
  !*** ./frontend/dev/js/chat/profile/profile.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.default = getName;\nfunction getName() {\n    return \"Alex\";\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kZXYvanMvY2hhdC9wcm9maWxlL3Byb2ZpbGUuanM/MWUyOCJdLCJuYW1lcyI6WyJnZXROYW1lIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFBd0JBLE87QUFBVCxTQUFTQSxPQUFULEdBQW1CO0FBQzlCLFdBQU8sTUFBUDtBQUNIIiwiZmlsZSI6Ii4vZnJvbnRlbmQvZGV2L2pzL2NoYXQvcHJvZmlsZS9wcm9maWxlLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gXCJBbGV4XCI7XG59Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./frontend/dev/js/chat/profile/profile.js\n");

/***/ }),

/***/ "./frontend/dev/less/chat/chat.less":
/*!******************************************!*\
  !*** ./frontend/dev/less/chat/chat.less ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kZXYvbGVzcy9jaGF0L2NoYXQubGVzcz82MzUzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Ii4vZnJvbnRlbmQvZGV2L2xlc3MvY2hhdC9jaGF0Lmxlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./frontend/dev/less/chat/chat.less\n");

/***/ }),

/***/ 8:
/*!*********************************************!*\
  !*** multi ./frontend/dev/js/chat/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/alexga/Desktop/chat_koa/frontend/dev/js/chat/index.js */"./frontend/dev/js/chat/index.js");


/***/ })

/******/ });
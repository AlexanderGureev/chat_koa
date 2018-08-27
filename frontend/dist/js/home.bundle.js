/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"home": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~home"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/dev/js/home/index.js":
/*!***************************************!*\
  !*** ./frontend/dev/js/home/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(_) {\n\nvar _validate = __webpack_require__(/*! ./validate/validate.js */ \"./frontend/dev/js/home/validate/validate.js\");\n\nvar _validate2 = _interopRequireDefault(_validate);\n\nvar _sum = __webpack_require__(/*! ./validate/sum */ \"./frontend/dev/js/home/validate/sum.js\");\n\nvar _sum2 = _interopRequireDefault(_sum);\n\n__webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n\n__webpack_require__(/*! bootstrap */ \"./node_modules/bootstrap/dist/js/bootstrap.js\");\n\n__webpack_require__(/*! ../../less/home/main.less */ \"./frontend/dev/less/home/main.less\");\n\n__webpack_require__(/*! root/bootstrap/dist/css/bootstrap.min.css */ \"./node_modules/bootstrap/dist/css/bootstrap.min.css\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// import jquery from \"jquery\";\n// console.log(_.partition([1, 3, 3, 4], n => n % 2));\n\n//import \"../common/socket.io\";\n// import _ from \"../common/lodash\";\nconsole.dir(_);\nconsole.log(_.take([1, 2, 3]));\n// console.log($('.title'));\n// if (module.hot) {\n//     module.hot.accept('./validate/sum', function () {\n//         console.log('Accepting the updated sum module!');\n//         console.log(`SUM = ${sum(1,2,3,4,5,6)}`);\n//     })\n// }\n\n//alert(validator());\n\n\nconsole.log(\"SUM = \" + (0, _sum2.default)(1, 2, 3, 4, 5, 6, 7));\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\")))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kZXYvanMvaG9tZS9pbmRleC5qcz8yZmYyIl0sIm5hbWVzIjpbImNvbnNvbGUiLCJkaXIiLCJfIiwibG9nIiwidGFrZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBR0E7O0FBQ0E7O0FBbUJBOztBQUVBOzs7O0FBcEJBO0FBQ0E7O0FBTEE7QUFDQTtBQUtBQSxRQUFRQyxHQUFSLENBQVlDLENBQVo7QUFDQUYsUUFBUUcsR0FBUixDQUFZRCxFQUFFRSxJQUFGLENBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsQ0FBUCxDQUFaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUlBSixRQUFRRyxHQUFSLFlBQXFCLG1CQUFJLENBQUosRUFBTSxDQUFOLEVBQVEsQ0FBUixFQUFVLENBQVYsRUFBWSxDQUFaLEVBQWMsQ0FBZCxFQUFnQixDQUFoQixDQUFyQixFIiwiZmlsZSI6Ii4vZnJvbnRlbmQvZGV2L2pzL2hvbWUvaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdmFsaWRhdG9yIGZyb20gXCIuL3ZhbGlkYXRlL3ZhbGlkYXRlLmpzXCI7XG5pbXBvcnQgc3VtIGZyb20gXCIuL3ZhbGlkYXRlL3N1bVwiO1xuLy9pbXBvcnQgXCIuLi9jb21tb24vc29ja2V0LmlvXCI7XG4vLyBpbXBvcnQgXyBmcm9tIFwiLi4vY29tbW9uL2xvZGFzaFwiO1xuaW1wb3J0IFwibG9kYXNoXCI7XG5pbXBvcnQgXCJib290c3RyYXBcIjtcbi8vIGltcG9ydCBqcXVlcnkgZnJvbSBcImpxdWVyeVwiO1xuLy8gY29uc29sZS5sb2coXy5wYXJ0aXRpb24oWzEsIDMsIDMsIDRdLCBuID0+IG4gJSAyKSk7XG5jb25zb2xlLmRpcihfKTtcbmNvbnNvbGUubG9nKF8udGFrZShbMSwgMiwgM10pKTtcbi8vIGNvbnNvbGUubG9nKCQoJy50aXRsZScpKTtcbi8vIGlmIChtb2R1bGUuaG90KSB7XG4vLyAgICAgbW9kdWxlLmhvdC5hY2NlcHQoJy4vdmFsaWRhdGUvc3VtJywgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICBjb25zb2xlLmxvZygnQWNjZXB0aW5nIHRoZSB1cGRhdGVkIHN1bSBtb2R1bGUhJyk7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKGBTVU0gPSAke3N1bSgxLDIsMyw0LDUsNil9YCk7XG4vLyAgICAgfSlcbi8vIH1cblxuLy9hbGVydCh2YWxpZGF0b3IoKSk7XG5cblxuXG5jb25zb2xlLmxvZyhgU1VNID0gJHtzdW0oMSwyLDMsNCw1LDYsNyl9YCk7XG5cbmltcG9ydCBcIi4uLy4uL2xlc3MvaG9tZS9tYWluLmxlc3NcIjtcblxuaW1wb3J0IFwicm9vdC9ib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLm1pbi5jc3NcIlxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./frontend/dev/js/home/index.js\n");

/***/ }),

/***/ "./frontend/dev/js/home/validate/sum.js":
/*!**********************************************!*\
  !*** ./frontend/dev/js/home/validate/sum.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.default = sum;\nfunction sum() {\n    for (var _len = arguments.length, elements = Array(_len), _key = 0; _key < _len; _key++) {\n        elements[_key] = arguments[_key];\n    }\n\n    return elements.reduce(function (prev, curr) {\n        return prev + curr;\n    });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kZXYvanMvaG9tZS92YWxpZGF0ZS9zdW0uanM/YzkxMiJdLCJuYW1lcyI6WyJzdW0iLCJlbGVtZW50cyIsInJlZHVjZSIsInByZXYiLCJjdXJyIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFBd0JBLEc7QUFBVCxTQUFTQSxHQUFULEdBQTBCO0FBQUEsc0NBQVZDLFFBQVU7QUFBVkEsZ0JBQVU7QUFBQTs7QUFDckMsV0FBT0EsU0FBU0MsTUFBVCxDQUFnQixVQUFDQyxJQUFELEVBQU9DLElBQVA7QUFBQSxlQUFnQkQsT0FBT0MsSUFBdkI7QUFBQSxLQUFoQixDQUFQO0FBQ0giLCJmaWxlIjoiLi9mcm9udGVuZC9kZXYvanMvaG9tZS92YWxpZGF0ZS9zdW0uanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdW0oLi4uZWxlbWVudHMpIHtcbiAgICByZXR1cm4gZWxlbWVudHMucmVkdWNlKChwcmV2LCBjdXJyKSA9PiBwcmV2ICsgY3Vycik7XG59Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./frontend/dev/js/home/validate/sum.js\n");

/***/ }),

/***/ "./frontend/dev/js/home/validate/validate.js":
/*!***************************************************!*\
  !*** ./frontend/dev/js/home/validate/validate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.default = validator;\nfunction validator() {\n    return true;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kZXYvanMvaG9tZS92YWxpZGF0ZS92YWxpZGF0ZS5qcz8yYTk2Il0sIm5hbWVzIjpbInZhbGlkYXRvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBQXdCQSxTO0FBQVQsU0FBU0EsU0FBVCxHQUFxQjtBQUNoQyxXQUFPLElBQVA7QUFDSCIsImZpbGUiOiIuL2Zyb250ZW5kL2Rldi9qcy9ob21lL3ZhbGlkYXRlL3ZhbGlkYXRlLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmFsaWRhdG9yKCkge1xuICAgIHJldHVybiB0cnVlO1xufSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./frontend/dev/js/home/validate/validate.js\n");

/***/ }),

/***/ "./frontend/dev/less/home/main.less":
/*!******************************************!*\
  !*** ./frontend/dev/less/home/main.less ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kZXYvbGVzcy9ob21lL21haW4ubGVzcz80YjkyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Ii4vZnJvbnRlbmQvZGV2L2xlc3MvaG9tZS9tYWluLmxlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./frontend/dev/less/home/main.less\n");

/***/ }),

/***/ 0:
/*!*********************************************!*\
  !*** multi ./frontend/dev/js/home/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/alexga/Desktop/koa_webpack/frontend/dev/js/home/index.js */"./frontend/dev/js/home/index.js");


/***/ })

/******/ });
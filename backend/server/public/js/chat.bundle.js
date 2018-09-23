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
/******/ 		"chat": 0
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
/******/ 	deferredModules.push([9,"vendors~chat~home","vendors~chat","chat~home"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/dev/js/chat/component/app/index.js":
/*!*****************************************************!*\
  !*** ./frontend/dev/js/chat/component/app/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ \"./node_modules/babel-runtime/core-js/object/get-prototype-of.js\");\n\nvar _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"./node_modules/babel-runtime/helpers/classCallCheck.js\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"./node_modules/babel-runtime/helpers/createClass.js\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ \"./node_modules/babel-runtime/helpers/possibleConstructorReturn.js\");\n\nvar _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);\n\nvar _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ \"./node_modules/babel-runtime/helpers/inherits.js\");\n\nvar _inherits3 = _interopRequireDefault(_inherits2);\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Preloader = __webpack_require__(/*! ../../../home/component/app/Preloader */ \"./frontend/dev/js/home/component/app/Preloader.js\");\n\nvar _Preloader2 = _interopRequireDefault(_Preloader);\n\nvar _header = __webpack_require__(/*! ../header */ \"./frontend/dev/js/chat/component/header/index.js\");\n\nvar _header2 = _interopRequireDefault(_header);\n\nvar _content = __webpack_require__(/*! ../content */ \"./frontend/dev/js/chat/component/content/index.js\");\n\nvar _content2 = _interopRequireDefault(_content);\n\nvar _leftBar = __webpack_require__(/*! ../leftBar */ \"./frontend/dev/js/chat/component/leftBar/index.js\");\n\nvar _leftBar2 = _interopRequireDefault(_leftBar);\n\nvar _socket = __webpack_require__(/*! socket.io-client */ \"./node_modules/socket.io-client/lib/index.js\");\n\nvar _socket2 = _interopRequireDefault(_socket);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar App = function (_Component) {\n  (0, _inherits3.default)(App, _Component);\n\n  function App(props) {\n    (0, _classCallCheck3.default)(this, App);\n\n    var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props));\n\n    _this.state = {\n      users: []\n    };\n\n    _this.socket = (0, _socket2.default)();\n    return _this;\n  }\n\n  (0, _createClass3.default)(App, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      var _this2 = this;\n\n      this.socket.on(\"connection_success\", function (users) {\n        _this2.setState({ users: users });\n      });\n      this.socket.on(\"user_connected\", function (users) {\n        _this2.setState({ users: users });\n      });\n      this.socket.on(\"user_disconnect\", function (users) {\n        _this2.setState({ users: users });\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var users = this.state.users;\n\n      return _react2.default.createElement(\n        _react2.default.Fragment,\n        null,\n        _react2.default.createElement(_Preloader2.default, null),\n        _react2.default.createElement(\n          \"div\",\n          { className: \"overflow-container\" },\n          _react2.default.createElement(_header2.default, null),\n          _react2.default.createElement(_leftBar2.default, null),\n          _react2.default.createElement(_content2.default, { users: users })\n        )\n      );\n    }\n  }]);\n  return App;\n}(_react.Component);\n\nexports.default = App;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kZXYvanMvY2hhdC9jb21wb25lbnQvYXBwL2luZGV4LmpzPzdjYzciXSwibmFtZXMiOlsiQXBwIiwicHJvcHMiLCJzdGF0ZSIsInVzZXJzIiwic29ja2V0Iiwib24iLCJzZXRTdGF0ZSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsRzs7O0FBQ25CLGVBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxnSUFDWEEsS0FEVzs7QUFBQSxVQUluQkMsS0FKbUIsR0FJWDtBQUNOQyxhQUFPO0FBREQsS0FKVzs7QUFFakIsVUFBS0MsTUFBTCxHQUFjLHVCQUFkO0FBRmlCO0FBR2xCOzs7O3dDQUltQjtBQUFBOztBQUNsQixXQUFLQSxNQUFMLENBQVlDLEVBQVosQ0FBZSxvQkFBZixFQUFxQyxpQkFBUztBQUM1QyxlQUFLQyxRQUFMLENBQWMsRUFBRUgsWUFBRixFQUFkO0FBQ0QsT0FGRDtBQUdBLFdBQUtDLE1BQUwsQ0FBWUMsRUFBWixDQUFlLGdCQUFmLEVBQWlDLGlCQUFTO0FBQ3hDLGVBQUtDLFFBQUwsQ0FBYyxFQUFFSCxZQUFGLEVBQWQ7QUFDRCxPQUZEO0FBR0EsV0FBS0MsTUFBTCxDQUFZQyxFQUFaLENBQWUsaUJBQWYsRUFBa0MsaUJBQVM7QUFDekMsZUFBS0MsUUFBTCxDQUFjLEVBQUVILFlBQUYsRUFBZDtBQUNELE9BRkQ7QUFHRDs7OzZCQUNRO0FBQUEsVUFDQ0EsS0FERCxHQUNXLEtBQUtELEtBRGhCLENBQ0NDLEtBREQ7O0FBRVAsYUFDRTtBQUFDLHVCQUFELENBQU8sUUFBUDtBQUFBO0FBQ0Usc0NBQUMsbUJBQUQsT0FERjtBQUVFO0FBQUE7QUFBQSxZQUFLLFdBQVUsb0JBQWY7QUFDRSx3Q0FBQyxnQkFBRCxPQURGO0FBRUUsd0NBQUMsaUJBQUQsT0FGRjtBQUdFLHdDQUFDLGlCQUFELElBQVMsT0FBT0EsS0FBaEI7QUFIRjtBQUZGLE9BREY7QUFVRDs7O0VBL0I4QkksZ0I7O2tCQUFaUCxHIiwiZmlsZSI6Ii4vZnJvbnRlbmQvZGV2L2pzL2NoYXQvY29tcG9uZW50L2FwcC9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcmVsb2FkZXIgZnJvbSBcIi4uLy4uLy4uL2hvbWUvY29tcG9uZW50L2FwcC9QcmVsb2FkZXJcIjtcbmltcG9ydCBIZWFkZXIgZnJvbSBcIi4uL2hlYWRlclwiO1xuaW1wb3J0IENvbnRlbnQgZnJvbSBcIi4uL2NvbnRlbnRcIjtcbmltcG9ydCBMZWZ0QmFyIGZyb20gXCIuLi9sZWZ0QmFyXCI7XG5pbXBvcnQgaW8gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zb2NrZXQgPSBpbygpO1xuICB9XG4gIHN0YXRlID0ge1xuICAgIHVzZXJzOiBbXVxuICB9O1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnNvY2tldC5vbihcImNvbm5lY3Rpb25fc3VjY2Vzc1wiLCB1c2VycyA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgdXNlcnMgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5zb2NrZXQub24oXCJ1c2VyX2Nvbm5lY3RlZFwiLCB1c2VycyA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgdXNlcnMgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5zb2NrZXQub24oXCJ1c2VyX2Rpc2Nvbm5lY3RcIiwgdXNlcnMgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHVzZXJzIH0pO1xuICAgIH0pO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHVzZXJzIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgIDxQcmVsb2FkZXIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdmVyZmxvdy1jb250YWluZXJcIj5cbiAgICAgICAgICA8SGVhZGVyIC8+XG4gICAgICAgICAgPExlZnRCYXIgLz5cbiAgICAgICAgICA8Q29udGVudCB1c2Vycz17dXNlcnN9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICApO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./frontend/dev/js/chat/component/app/index.js\n");

/***/ }),

/***/ "./frontend/dev/js/chat/component/content/ChatContainer.js":
/*!*****************************************************************!*\
  !*** ./frontend/dev/js/chat/component/content/ChatContainer.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar ChatContainer = function ChatContainer(props) {\n  return _react2.default.createElement(\n    \"div\",\n    { className: \"chat-container\" },\n    _react2.default.createElement(\"div\", { className: \"posts\" }),\n    _react2.default.createElement(\n      \"form\",\n      { action: \"\", className: \"send-message\" },\n      _react2.default.createElement(\"input\", { type: \"text\", id: \"input-message\", placeholder: \"Write something\" }),\n      _react2.default.createElement(\"a\", { href: \"#\", className: \"link\" }),\n      _react2.default.createElement(\"button\", { type: \"submit\", className: \"send\" }),\n      _react2.default.createElement(\"a\", { href: \"#\", className: \"smile\" })\n    )\n  );\n};\n\nexports.default = ChatContainer;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kZXYvanMvY2hhdC9jb21wb25lbnQvY29udGVudC9DaGF0Q29udGFpbmVyLmpzPzU0NjkiXSwibmFtZXMiOlsiQ2hhdENvbnRhaW5lciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU1BLGdCQUFnQixTQUFoQkEsYUFBZ0I7QUFBQSxTQUNwQjtBQUFBO0FBQUEsTUFBSyxXQUFVLGdCQUFmO0FBQ0UsMkNBQUssV0FBVSxPQUFmLEdBREY7QUFHRTtBQUFBO0FBQUEsUUFBTSxRQUFPLEVBQWIsRUFBZ0IsV0FBVSxjQUExQjtBQUNFLCtDQUFPLE1BQUssTUFBWixFQUFtQixJQUFHLGVBQXRCLEVBQXNDLGFBQVksaUJBQWxELEdBREY7QUFFRSwyQ0FBRyxNQUFLLEdBQVIsRUFBWSxXQUFVLE1BQXRCLEdBRkY7QUFHRSxnREFBUSxNQUFLLFFBQWIsRUFBc0IsV0FBVSxNQUFoQyxHQUhGO0FBSUUsMkNBQUcsTUFBSyxHQUFSLEVBQVksV0FBVSxPQUF0QjtBQUpGO0FBSEYsR0FEb0I7QUFBQSxDQUF0Qjs7a0JBYWVBLGEiLCJmaWxlIjoiLi9mcm9udGVuZC9kZXYvanMvY2hhdC9jb21wb25lbnQvY29udGVudC9DaGF0Q29udGFpbmVyLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuXG5jb25zdCBDaGF0Q29udGFpbmVyID0gcHJvcHMgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cImNoYXQtY29udGFpbmVyXCI+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJwb3N0c1wiIC8+XG5cbiAgICA8Zm9ybSBhY3Rpb249XCJcIiBjbGFzc05hbWU9XCJzZW5kLW1lc3NhZ2VcIj5cbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiaW5wdXQtbWVzc2FnZVwiIHBsYWNlaG9sZGVyPVwiV3JpdGUgc29tZXRoaW5nXCIgLz5cbiAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwibGlua1wiIC8+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJzZW5kXCIgLz5cbiAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwic21pbGVcIiAvPlxuICAgIDwvZm9ybT5cbiAgPC9kaXY+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBDaGF0Q29udGFpbmVyO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./frontend/dev/js/chat/component/content/ChatContainer.js\n");

/***/ }),

/***/ "./frontend/dev/js/chat/component/content/RightBar.js":
/*!************************************************************!*\
  !*** ./frontend/dev/js/chat/component/content/RightBar.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends2 = __webpack_require__(/*! babel-runtime/helpers/extends */ \"./node_modules/babel-runtime/helpers/extends.js\");\n\nvar _extends3 = _interopRequireDefault(_extends2);\n\nvar _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ \"./node_modules/babel-runtime/core-js/object/get-prototype-of.js\");\n\nvar _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"./node_modules/babel-runtime/helpers/classCallCheck.js\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"./node_modules/babel-runtime/helpers/createClass.js\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ \"./node_modules/babel-runtime/helpers/possibleConstructorReturn.js\");\n\nvar _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);\n\nvar _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ \"./node_modules/babel-runtime/helpers/inherits.js\");\n\nvar _inherits3 = _interopRequireDefault(_inherits2);\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _User = __webpack_require__(/*! ./User */ \"./frontend/dev/js/chat/component/content/User.js\");\n\nvar _User2 = _interopRequireDefault(_User);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar RightBar = function (_Component) {\n  (0, _inherits3.default)(RightBar, _Component);\n\n  function RightBar() {\n    var _ref;\n\n    var _temp, _this, _ret;\n\n    (0, _classCallCheck3.default)(this, RightBar);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RightBar.__proto__ || (0, _getPrototypeOf2.default)(RightBar)).call.apply(_ref, [this].concat(args))), _this), _this.handlerOpenProfile = function (_id) {\n      return function (e) {\n        console.log(_id);\n        e.preventDefault();\n      };\n    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);\n  }\n\n  (0, _createClass3.default)(RightBar, [{\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      var users = this.props.users;\n\n      return _react2.default.createElement(\n        \"div\",\n        { className: \"right-side-bar\" },\n        _react2.default.createElement(\n          \"h3\",\n          null,\n          \"Online -\",\n          _react2.default.createElement(\n            \"span\",\n            { className: \"online-count\" },\n            \" \",\n            users.length,\n            \" \"\n          )\n        ),\n        _react2.default.createElement(\n          \"ul\",\n          { className: \"userOnline\" },\n          users.map(function (user) {\n            return _react2.default.createElement(_User2.default, (0, _extends3.default)({ key: user._id, handlerOpenProfile: _this2.handlerOpenProfile(user._id) }, user));\n          })\n        )\n      );\n    }\n  }]);\n  return RightBar;\n}(_react.Component);\n\n;\n\nexports.default = RightBar;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kZXYvanMvY2hhdC9jb21wb25lbnQvY29udGVudC9SaWdodEJhci5qcz8zMjlkIl0sIm5hbWVzIjpbIlJpZ2h0QmFyIiwiaGFuZGxlck9wZW5Qcm9maWxlIiwiY29uc29sZSIsImxvZyIsIl9pZCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInVzZXJzIiwicHJvcHMiLCJsZW5ndGgiLCJtYXAiLCJ1c2VyIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFTUEsUTs7Ozs7Ozs7Ozs7Ozs7Z05BRUpDLGtCLEdBQXFCO0FBQUEsYUFBTyxhQUFLO0FBQy9CQyxnQkFBUUMsR0FBUixDQUFZQyxHQUFaO0FBQ0FDLFVBQUVDLGNBQUY7QUFDRCxPQUhvQjtBQUFBLEs7Ozs7OzZCQUtaO0FBQUE7O0FBQUEsVUFDQ0MsS0FERCxHQUNXLEtBQUtDLEtBRGhCLENBQ0NELEtBREQ7O0FBRVAsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGdCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFDVTtBQUFBO0FBQUEsY0FBTSxXQUFVLGNBQWhCO0FBQUE7QUFBaUNBLGtCQUFNRSxNQUF2QztBQUFBO0FBQUE7QUFEVixTQURGO0FBSUU7QUFBQTtBQUFBLFlBQUksV0FBVSxZQUFkO0FBQ0dGLGdCQUFNRyxHQUFOLENBQVU7QUFBQSxtQkFDVCw4QkFBQyxjQUFELDJCQUFNLEtBQUtDLEtBQUtQLEdBQWhCLEVBQXFCLG9CQUFvQixPQUFLSCxrQkFBTCxDQUF3QlUsS0FBS1AsR0FBN0IsQ0FBekMsSUFBZ0ZPLElBQWhGLEVBRFM7QUFBQSxXQUFWO0FBREg7QUFKRixPQURGO0FBWUQ7OztFQXJCb0JDLGdCOztBQXVCdEI7O2tCQUVjWixRIiwiZmlsZSI6Ii4vZnJvbnRlbmQvZGV2L2pzL2NoYXQvY29tcG9uZW50L2NvbnRlbnQvUmlnaHRCYXIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgVXNlciBmcm9tIFwiLi9Vc2VyXCI7XG5cbmNsYXNzIFJpZ2h0QmFyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgXG4gIGhhbmRsZXJPcGVuUHJvZmlsZSA9IF9pZCA9PiBlID0+IHtcbiAgICBjb25zb2xlLmxvZyhfaWQpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHVzZXJzIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJpZ2h0LXNpZGUtYmFyXCI+XG4gICAgICAgIDxoMz5cbiAgICAgICAgICBPbmxpbmUgLTxzcGFuIGNsYXNzTmFtZT1cIm9ubGluZS1jb3VudFwiPiB7dXNlcnMubGVuZ3RofSA8L3NwYW4+XG4gICAgICAgIDwvaDM+XG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJ1c2VyT25saW5lXCI+XG4gICAgICAgICAge3VzZXJzLm1hcCh1c2VyID0+IChcbiAgICAgICAgICAgIDxVc2VyIGtleT17dXNlci5faWR9IGhhbmRsZXJPcGVuUHJvZmlsZT17dGhpcy5oYW5kbGVyT3BlblByb2ZpbGUodXNlci5faWQpfSB7Li4udXNlcn0gLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbiAgXG59O1xuXG5leHBvcnQgZGVmYXVsdCBSaWdodEJhcjtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./frontend/dev/js/chat/component/content/RightBar.js\n");

/***/ }),

/***/ "./frontend/dev/js/chat/component/content/User.js":
/*!********************************************************!*\
  !*** ./frontend/dev/js/chat/component/content/User.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar User = function User(props) {\n  var username = props.username,\n      avatarPath = props.profile.avatarPath,\n      handlerOpenProfile = props.handlerOpenProfile;\n\n  return _react2.default.createElement(\n    \"li\",\n    { onClick: handlerOpenProfile },\n    _react2.default.createElement(\"img\", { src: avatarPath, alt: \"avatar\" }),\n    _react2.default.createElement(\n      \"span\",\n      { className: \"name\" },\n      username\n    )\n  );\n};\n\nexports.default = User;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kZXYvanMvY2hhdC9jb21wb25lbnQvY29udGVudC9Vc2VyLmpzP2FlYWYiXSwibmFtZXMiOlsiVXNlciIsInByb3BzIiwidXNlcm5hbWUiLCJhdmF0YXJQYXRoIiwicHJvZmlsZSIsImhhbmRsZXJPcGVuUHJvZmlsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU1BLE9BQU8sU0FBUEEsSUFBTyxDQUFDQyxLQUFELEVBQVc7QUFBQSxNQUVkQyxRQUZjLEdBRTRDRCxLQUY1QyxDQUVkQyxRQUZjO0FBQUEsTUFFT0MsVUFGUCxHQUU0Q0YsS0FGNUMsQ0FFSkcsT0FGSSxDQUVPRCxVQUZQO0FBQUEsTUFFcUJFLGtCQUZyQixHQUU0Q0osS0FGNUMsQ0FFcUJJLGtCQUZyQjs7QUFHdEIsU0FDRTtBQUFBO0FBQUEsTUFBSSxTQUFTQSxrQkFBYjtBQUNFLDJDQUFLLEtBQUtGLFVBQVYsRUFBc0IsS0FBSSxRQUExQixHQURGO0FBRUU7QUFBQTtBQUFBLFFBQU0sV0FBVSxNQUFoQjtBQUF3QkQ7QUFBeEI7QUFGRixHQURGO0FBTUQsQ0FURDs7a0JBV2VGLEkiLCJmaWxlIjoiLi9mcm9udGVuZC9kZXYvanMvY2hhdC9jb21wb25lbnQvY29udGVudC9Vc2VyLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuXG5jb25zdCBVc2VyID0gKHByb3BzKSA9PiB7XG5cbiAgY29uc3QgeyB1c2VybmFtZSwgcHJvZmlsZTogeyBhdmF0YXJQYXRoIH0sIGhhbmRsZXJPcGVuUHJvZmlsZSB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPGxpIG9uQ2xpY2s9e2hhbmRsZXJPcGVuUHJvZmlsZX0+XG4gICAgICA8aW1nIHNyYz17YXZhdGFyUGF0aH0gYWx0PVwiYXZhdGFyXCIgLz5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hbWVcIj57dXNlcm5hbWV9PC9zcGFuPlxuICAgIDwvbGk+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBVc2VyO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./frontend/dev/js/chat/component/content/User.js\n");

/***/ }),

/***/ "./frontend/dev/js/chat/component/content/index.js":
/*!*********************************************************!*\
  !*** ./frontend/dev/js/chat/component/content/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _ChatContainer = __webpack_require__(/*! ./ChatContainer */ \"./frontend/dev/js/chat/component/content/ChatContainer.js\");\n\nvar _ChatContainer2 = _interopRequireDefault(_ChatContainer);\n\nvar _RightBar = __webpack_require__(/*! ./RightBar */ \"./frontend/dev/js/chat/component/content/RightBar.js\");\n\nvar _RightBar2 = _interopRequireDefault(_RightBar);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar MainChat = function MainChat(_ref) {\n  var users = _ref.users;\n  return _react2.default.createElement(\n    \"div\",\n    { className: \"main-chat\" },\n    _react2.default.createElement(_ChatContainer2.default, null),\n    _react2.default.createElement(_RightBar2.default, { users: users })\n  );\n};\n\nexports.default = MainChat;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kZXYvanMvY2hhdC9jb21wb25lbnQvY29udGVudC9pbmRleC5qcz9iZTdjIl0sIm5hbWVzIjpbIk1haW5DaGF0IiwidXNlcnMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsV0FBVyxTQUFYQSxRQUFXO0FBQUEsTUFBRUMsS0FBRixRQUFFQSxLQUFGO0FBQUEsU0FDZjtBQUFBO0FBQUEsTUFBSyxXQUFVLFdBQWY7QUFDRSxrQ0FBQyx1QkFBRCxPQURGO0FBRUUsa0NBQUMsa0JBQUQsSUFBVSxPQUFPQSxLQUFqQjtBQUZGLEdBRGU7QUFBQSxDQUFqQjs7a0JBT2VELFEiLCJmaWxlIjoiLi9mcm9udGVuZC9kZXYvanMvY2hhdC9jb21wb25lbnQvY29udGVudC9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBDaGF0Q29udGFpbmVyIGZyb20gXCIuL0NoYXRDb250YWluZXJcIjtcbmltcG9ydCBSaWdodEJhciBmcm9tIFwiLi9SaWdodEJhclwiO1xuXG5jb25zdCBNYWluQ2hhdCA9ICh7dXNlcnN9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwibWFpbi1jaGF0XCI+XG4gICAgPENoYXRDb250YWluZXIgLz5cbiAgICA8UmlnaHRCYXIgdXNlcnM9e3VzZXJzfS8+XG4gIDwvZGl2PlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgTWFpbkNoYXQ7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./frontend/dev/js/chat/component/content/index.js\n");

/***/ }),

/***/ "./frontend/dev/js/chat/component/header/Logo.js":
/*!*******************************************************!*\
  !*** ./frontend/dev/js/chat/component/header/Logo.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Logo = function Logo(props) {\n  return _react2.default.createElement(\n    \"div\",\n    { className: \"logo\" },\n    _react2.default.createElement(\"img\", { src: \"img/logo.svg\", alt: \"\" }),\n    _react2.default.createElement(\n      \"h1\",\n      null,\n      \"Chater\"\n    )\n  );\n};\n\nexports.default = Logo;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kZXYvanMvY2hhdC9jb21wb25lbnQvaGVhZGVyL0xvZ28uanM/YzgzMyJdLCJuYW1lcyI6WyJMb2dvIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBTUEsT0FBTyxTQUFQQSxJQUFPO0FBQUEsU0FDWDtBQUFBO0FBQUEsTUFBSyxXQUFVLE1BQWY7QUFDRSwyQ0FBSyxLQUFJLGNBQVQsRUFBd0IsS0FBSSxFQUE1QixHQURGO0FBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZGLEdBRFc7QUFBQSxDQUFiOztrQkFPZUEsSSIsImZpbGUiOiIuL2Zyb250ZW5kL2Rldi9qcy9jaGF0L2NvbXBvbmVudC9oZWFkZXIvTG9nby5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcblxuY29uc3QgTG9nbyA9IHByb3BzID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJsb2dvXCI+XG4gICAgPGltZyBzcmM9XCJpbWcvbG9nby5zdmdcIiBhbHQ9XCJcIiAvPlxuICAgIDxoMT5DaGF0ZXI8L2gxPlxuICA8L2Rpdj5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IExvZ287XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./frontend/dev/js/chat/component/header/Logo.js\n");

/***/ }),

/***/ "./frontend/dev/js/chat/component/header/RightBlockHeader.js":
/*!*******************************************************************!*\
  !*** ./frontend/dev/js/chat/component/header/RightBlockHeader.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Search = __webpack_require__(/*! ./Search */ \"./frontend/dev/js/chat/component/header/Search.js\");\n\nvar _Search2 = _interopRequireDefault(_Search);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar RightBlockHeader = function RightBlockHeader(props) {\n  return _react2.default.createElement(\n    \"div\",\n    { className: \"flex-container\" },\n    _react2.default.createElement(\n      \"div\",\n      { className: \"link-home\" },\n      _react2.default.createElement(\n        \"a\",\n        { href: \"/\" },\n        \"Home\"\n      )\n    ),\n    _react2.default.createElement(_Search2.default, null),\n    _react2.default.createElement(\n      \"div\",\n      { className: \"question\" },\n      _react2.default.createElement(\"i\", { className: \"fas fa-question\" })\n    )\n  );\n};\n\nexports.default = RightBlockHeader;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kZXYvanMvY2hhdC9jb21wb25lbnQvaGVhZGVyL1JpZ2h0QmxvY2tIZWFkZXIuanM/ZDM0MyJdLCJuYW1lcyI6WyJSaWdodEJsb2NrSGVhZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxtQkFBbUIsU0FBbkJBLGdCQUFtQjtBQUFBLFNBQ3ZCO0FBQUE7QUFBQSxNQUFLLFdBQVUsZ0JBQWY7QUFDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLFdBQWY7QUFDRTtBQUFBO0FBQUEsVUFBRyxNQUFLLEdBQVI7QUFBQTtBQUFBO0FBREYsS0FERjtBQUtFLGtDQUFDLGdCQUFELE9BTEY7QUFPRTtBQUFBO0FBQUEsUUFBSyxXQUFVLFVBQWY7QUFDRSwyQ0FBRyxXQUFVLGlCQUFiO0FBREY7QUFQRixHQUR1QjtBQUFBLENBQXpCOztrQkFjZUEsZ0IiLCJmaWxlIjoiLi9mcm9udGVuZC9kZXYvanMvY2hhdC9jb21wb25lbnQvaGVhZGVyL1JpZ2h0QmxvY2tIZWFkZXIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU2VhcmNoIGZyb20gXCIuL1NlYXJjaFwiO1xuXG5jb25zdCBSaWdodEJsb2NrSGVhZGVyID0gcHJvcHMgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtY29udGFpbmVyXCI+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJsaW5rLWhvbWVcIj5cbiAgICAgIDxhIGhyZWY9XCIvXCI+SG9tZTwvYT5cbiAgICA8L2Rpdj5cblxuICAgIDxTZWFyY2ggLz5cblxuICAgIDxkaXYgY2xhc3NOYW1lPVwicXVlc3Rpb25cIj5cbiAgICAgIDxpIGNsYXNzTmFtZT1cImZhcyBmYS1xdWVzdGlvblwiIC8+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgUmlnaHRCbG9ja0hlYWRlcjtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./frontend/dev/js/chat/component/header/RightBlockHeader.js\n");

/***/ }),

/***/ "./frontend/dev/js/chat/component/header/Search.js":
/*!*********************************************************!*\
  !*** ./frontend/dev/js/chat/component/header/Search.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Search = function Search(props) {\n  return _react2.default.createElement(\n    \"div\",\n    { className: \"search\" },\n    _react2.default.createElement(\"input\", { type: \"text\", name: \"search\", id: \"searchInput\", placeholder: \"Search\" }),\n    _react2.default.createElement(\n      \"span\",\n      { className: \"find\" },\n      _react2.default.createElement(\"i\", { className: \"fas fa-search\" })\n    )\n  );\n};\n\nexports.default = Search;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kZXYvanMvY2hhdC9jb21wb25lbnQvaGVhZGVyL1NlYXJjaC5qcz9jZmY1Il0sIm5hbWVzIjpbIlNlYXJjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU1BLFNBQVMsU0FBVEEsTUFBUztBQUFBLFNBQ2I7QUFBQTtBQUFBLE1BQUssV0FBVSxRQUFmO0FBQ0UsNkNBQU8sTUFBSyxNQUFaLEVBQW1CLE1BQUssUUFBeEIsRUFBaUMsSUFBRyxhQUFwQyxFQUFrRCxhQUFZLFFBQTlELEdBREY7QUFFRTtBQUFBO0FBQUEsUUFBTSxXQUFVLE1BQWhCO0FBQ0UsMkNBQUcsV0FBVSxlQUFiO0FBREY7QUFGRixHQURhO0FBQUEsQ0FBZjs7a0JBU2VBLE0iLCJmaWxlIjoiLi9mcm9udGVuZC9kZXYvanMvY2hhdC9jb21wb25lbnQvaGVhZGVyL1NlYXJjaC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcblxuY29uc3QgU2VhcmNoID0gcHJvcHMgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaFwiPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJzZWFyY2hcIiBpZD1cInNlYXJjaElucHV0XCIgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIiAvPlxuICAgIDxzcGFuIGNsYXNzTmFtZT1cImZpbmRcIj5cbiAgICAgIDxpIGNsYXNzTmFtZT1cImZhcyBmYS1zZWFyY2hcIiAvPlxuICAgIDwvc3Bhbj5cbiAgPC9kaXY+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2g7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./frontend/dev/js/chat/component/header/Search.js\n");

/***/ }),

/***/ "./frontend/dev/js/chat/component/header/index.js":
/*!********************************************************!*\
  !*** ./frontend/dev/js/chat/component/header/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Logo = __webpack_require__(/*! ./Logo */ \"./frontend/dev/js/chat/component/header/Logo.js\");\n\nvar _Logo2 = _interopRequireDefault(_Logo);\n\nvar _RightBlockHeader = __webpack_require__(/*! ./RightBlockHeader */ \"./frontend/dev/js/chat/component/header/RightBlockHeader.js\");\n\nvar _RightBlockHeader2 = _interopRequireDefault(_RightBlockHeader);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar ChatHeader = function ChatHeader(props) {\n  return _react2.default.createElement(\n    \"header\",\n    { className: \"chat-header\" },\n    _react2.default.createElement(_Logo2.default, null),\n    _react2.default.createElement(_RightBlockHeader2.default, null)\n  );\n};\n\nexports.default = ChatHeader;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kZXYvanMvY2hhdC9jb21wb25lbnQvaGVhZGVyL2luZGV4LmpzPzI5ZmIiXSwibmFtZXMiOlsiQ2hhdEhlYWRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxhQUFhLFNBQWJBLFVBQWE7QUFBQSxTQUNqQjtBQUFBO0FBQUEsTUFBUSxXQUFVLGFBQWxCO0FBQ0Usa0NBQUMsY0FBRCxPQURGO0FBRUUsa0NBQUMsMEJBQUQ7QUFGRixHQURpQjtBQUFBLENBQW5COztrQkFPZUEsVSIsImZpbGUiOiIuL2Zyb250ZW5kL2Rldi9qcy9jaGF0L2NvbXBvbmVudC9oZWFkZXIvaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgTG9nbyBmcm9tIFwiLi9Mb2dvXCI7XG5pbXBvcnQgUmlnaHRCbG9ja0hlYWRlciBmcm9tIFwiLi9SaWdodEJsb2NrSGVhZGVyXCI7XG5cbmNvbnN0IENoYXRIZWFkZXIgPSBwcm9wcyA9PiAoXG4gIDxoZWFkZXIgY2xhc3NOYW1lPVwiY2hhdC1oZWFkZXJcIj5cbiAgICA8TG9nbyAvPlxuICAgIDxSaWdodEJsb2NrSGVhZGVyIC8+XG4gIDwvaGVhZGVyPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hhdEhlYWRlcjtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./frontend/dev/js/chat/component/header/index.js\n");

/***/ }),

/***/ "./frontend/dev/js/chat/component/index.js":
/*!*************************************************!*\
  !*** ./frontend/dev/js/chat/component/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.App = undefined;\n\nvar _app = __webpack_require__(/*! ./app */ \"./frontend/dev/js/chat/component/app/index.js\");\n\nvar _app2 = _interopRequireDefault(_app);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.App = _app2.default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kZXYvanMvY2hhdC9jb21wb25lbnQvaW5kZXguanM/ZDhiOCJdLCJuYW1lcyI6WyJBcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7O1FBR0VBLEcsR0FBQUEsYSIsImZpbGUiOiIuL2Zyb250ZW5kL2Rldi9qcy9jaGF0L2NvbXBvbmVudC9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBcHAgZnJvbSBcIi4vYXBwXCI7XG5cbmV4cG9ydCB7XG4gIEFwcFxufTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./frontend/dev/js/chat/component/index.js\n");

/***/ }),

/***/ "./frontend/dev/js/chat/component/leftBar/BarFooter.js":
/*!*************************************************************!*\
  !*** ./frontend/dev/js/chat/component/leftBar/BarFooter.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar BarFooter = function BarFooter(props) {\n  return _react2.default.createElement(\n    \"div\",\n    { className: \"bar-footer\" },\n    _react2.default.createElement(\n      \"div\",\n      { className: \"sign-out\" },\n      _react2.default.createElement(\"i\", { className: \"fas fa-power-off\" }),\n      _react2.default.createElement(\n        \"a\",\n        { href: \"\" },\n        \"Sign out\"\n      )\n    )\n  );\n};\n\nexports.default = BarFooter;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kZXYvanMvY2hhdC9jb21wb25lbnQvbGVmdEJhci9CYXJGb290ZXIuanM/YTcyMCJdLCJuYW1lcyI6WyJCYXJGb290ZXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFNQSxZQUFZLFNBQVpBLFNBQVk7QUFBQSxTQUNoQjtBQUFBO0FBQUEsTUFBSyxXQUFVLFlBQWY7QUFDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLFVBQWY7QUFDRSwyQ0FBRyxXQUFVLGtCQUFiLEdBREY7QUFFRTtBQUFBO0FBQUEsVUFBRyxNQUFLLEVBQVI7QUFBQTtBQUFBO0FBRkY7QUFERixHQURnQjtBQUFBLENBQWxCOztrQkFTZUEsUyIsImZpbGUiOiIuL2Zyb250ZW5kL2Rldi9qcy9jaGF0L2NvbXBvbmVudC9sZWZ0QmFyL0JhckZvb3Rlci5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcblxuY29uc3QgQmFyRm9vdGVyID0gcHJvcHMgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cImJhci1mb290ZXJcIj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNpZ24tb3V0XCI+XG4gICAgICA8aSBjbGFzc05hbWU9XCJmYXMgZmEtcG93ZXItb2ZmXCIgLz5cbiAgICAgIDxhIGhyZWY9XCJcIj5TaWduIG91dDwvYT5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBCYXJGb290ZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./frontend/dev/js/chat/component/leftBar/BarFooter.js\n");

/***/ }),

/***/ "./frontend/dev/js/chat/component/leftBar/Nav.js":
/*!*******************************************************!*\
  !*** ./frontend/dev/js/chat/component/leftBar/Nav.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Nav = function Nav(props) {\n  return _react2.default.createElement(\n    \"nav\",\n    null,\n    _react2.default.createElement(\n      \"ul\",\n      null,\n      _react2.default.createElement(\n        \"li\",\n        null,\n        _react2.default.createElement(\n          \"a\",\n          { href: \"#\" },\n          \"Profile\"\n        )\n      ),\n      _react2.default.createElement(\n        \"li\",\n        null,\n        _react2.default.createElement(\n          \"a\",\n          { href: \"#\" },\n          \"Messages\"\n        )\n      ),\n      _react2.default.createElement(\n        \"li\",\n        null,\n        _react2.default.createElement(\n          \"a\",\n          { href: \"#\" },\n          \"Settings\"\n        )\n      )\n    )\n  );\n};\n\nexports.default = Nav;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kZXYvanMvY2hhdC9jb21wb25lbnQvbGVmdEJhci9OYXYuanM/YmIxMSJdLCJuYW1lcyI6WyJOYXYiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFNQSxNQUFNLFNBQU5BLEdBQU07QUFBQSxTQUNWO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxZQUFHLE1BQUssR0FBUjtBQUFBO0FBQUE7QUFERixPQURGO0FBSUU7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLFlBQUcsTUFBSyxHQUFSO0FBQUE7QUFBQTtBQURGLE9BSkY7QUFPRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsWUFBRyxNQUFLLEdBQVI7QUFBQTtBQUFBO0FBREY7QUFQRjtBQURGLEdBRFU7QUFBQSxDQUFaOztrQkFnQmVBLEciLCJmaWxlIjoiLi9mcm9udGVuZC9kZXYvanMvY2hhdC9jb21wb25lbnQvbGVmdEJhci9OYXYuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XG5cbmNvbnN0IE5hdiA9IHByb3BzID0+IChcbiAgPG5hdj5cbiAgICA8dWw+XG4gICAgICA8bGk+XG4gICAgICAgIDxhIGhyZWY9XCIjXCI+UHJvZmlsZTwvYT5cbiAgICAgIDwvbGk+XG4gICAgICA8bGk+XG4gICAgICAgIDxhIGhyZWY9XCIjXCI+TWVzc2FnZXM8L2E+XG4gICAgICA8L2xpPlxuICAgICAgPGxpPlxuICAgICAgICA8YSBocmVmPVwiI1wiPlNldHRpbmdzPC9hPlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICA8L25hdj5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IE5hdjtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./frontend/dev/js/chat/component/leftBar/Nav.js\n");

/***/ }),

/***/ "./frontend/dev/js/chat/component/leftBar/Rooms.js":
/*!*********************************************************!*\
  !*** ./frontend/dev/js/chat/component/leftBar/Rooms.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Rooms = function Rooms(props) {\n  return _react2.default.createElement(\n    \"div\",\n    { className: \"rooms\" },\n    _react2.default.createElement(\n      \"h3\",\n      null,\n      \"Rooms\",\n      _react2.default.createElement(\n        \"span\",\n        { className: \"rooms-add\" },\n        _react2.default.createElement(\"i\", { className: \"fas fa-plus\" })\n      )\n    ),\n    _react2.default.createElement(\n      \"ul\",\n      null,\n      _react2.default.createElement(\n        \"li\",\n        null,\n        _react2.default.createElement(\n          \"a\",\n          { href: \"\" },\n          \"Project manager\"\n        )\n      )\n    )\n  );\n};\n\nexports.default = Rooms;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kZXYvanMvY2hhdC9jb21wb25lbnQvbGVmdEJhci9Sb29tcy5qcz9kMmNjIl0sIm5hbWVzIjpbIlJvb21zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBTUEsUUFBUSxTQUFSQSxLQUFRO0FBQUEsU0FDWjtBQUFBO0FBQUEsTUFBSyxXQUFVLE9BQWY7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUVFO0FBQUE7QUFBQSxVQUFNLFdBQVUsV0FBaEI7QUFDRSw2Q0FBRyxXQUFVLGFBQWI7QUFERjtBQUZGLEtBREY7QUFPRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsWUFBRyxNQUFLLEVBQVI7QUFBQTtBQUFBO0FBREY7QUFERjtBQVBGLEdBRFk7QUFBQSxDQUFkOztrQkFnQmVBLEsiLCJmaWxlIjoiLi9mcm9udGVuZC9kZXYvanMvY2hhdC9jb21wb25lbnQvbGVmdEJhci9Sb29tcy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcblxuY29uc3QgUm9vbXMgPSBwcm9wcyA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwicm9vbXNcIj5cbiAgICA8aDM+XG4gICAgICBSb29tc1xuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicm9vbXMtYWRkXCI+XG4gICAgICAgIDxpIGNsYXNzTmFtZT1cImZhcyBmYS1wbHVzXCIgLz5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2gzPlxuICAgIDx1bD5cbiAgICAgIDxsaT5cbiAgICAgICAgPGEgaHJlZj1cIlwiPlByb2plY3QgbWFuYWdlcjwvYT5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgPC9kaXY+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBSb29tcztcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./frontend/dev/js/chat/component/leftBar/Rooms.js\n");

/***/ }),

/***/ "./frontend/dev/js/chat/component/leftBar/index.js":
/*!*********************************************************!*\
  !*** ./frontend/dev/js/chat/component/leftBar/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ \"./node_modules/babel-runtime/core-js/object/get-prototype-of.js\");\n\nvar _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"./node_modules/babel-runtime/helpers/classCallCheck.js\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"./node_modules/babel-runtime/helpers/createClass.js\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ \"./node_modules/babel-runtime/helpers/possibleConstructorReturn.js\");\n\nvar _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);\n\nvar _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ \"./node_modules/babel-runtime/helpers/inherits.js\");\n\nvar _inherits3 = _interopRequireDefault(_inherits2);\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _BarFooter = __webpack_require__(/*! ./BarFooter */ \"./frontend/dev/js/chat/component/leftBar/BarFooter.js\");\n\nvar _BarFooter2 = _interopRequireDefault(_BarFooter);\n\nvar _Nav = __webpack_require__(/*! ./Nav */ \"./frontend/dev/js/chat/component/leftBar/Nav.js\");\n\nvar _Nav2 = _interopRequireDefault(_Nav);\n\nvar _Rooms = __webpack_require__(/*! ./Rooms */ \"./frontend/dev/js/chat/component/leftBar/Rooms.js\");\n\nvar _Rooms2 = _interopRequireDefault(_Rooms);\n\nvar _classnames = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n\nvar _classnames2 = _interopRequireDefault(_classnames);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar LeftBar = function (_Component) {\n  (0, _inherits3.default)(LeftBar, _Component);\n\n  function LeftBar(props) {\n    (0, _classCallCheck3.default)(this, LeftBar);\n\n    var _this = (0, _possibleConstructorReturn3.default)(this, (LeftBar.__proto__ || (0, _getPrototypeOf2.default)(LeftBar)).call(this, props));\n\n    _this.state = {\n      isOpen: false\n    };\n\n    _this.handleCloseMenu = function (_ref) {\n      var target = _ref.target;\n\n      if (!_this.leftBar.current.contains(target)) {\n        _this.setState({\n          isOpen: false\n        });\n      }\n    };\n\n    _this.toggleMenu = function () {\n      _this.setState({\n        isOpen: !_this.state.isOpen\n      });\n    };\n\n    _this.leftBar = _react2.default.createRef();\n    return _this;\n  }\n\n  (0, _createClass3.default)(LeftBar, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      window.addEventListener(\"click\", this.handleCloseMenu);\n      window.addEventListener(\"touchend\", this.handleCloseMenu);\n    }\n  }, {\n    key: \"componentWillUnmount\",\n    value: function componentWillUnmount() {\n      window.removeEventListener(\"click\", this.handleCloseMenu);\n      window.removeEventListener(\"touchend\", this.handleCloseMenu);\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var isOpen = this.state.isOpen;\n\n\n      var classesBar = (0, _classnames2.default)({\n        \"left-side-bar\": true,\n        active: isOpen\n      });\n      var classesToogle = (0, _classnames2.default)({\n        toggle: true,\n        hide: isOpen\n      });\n\n      return _react2.default.createElement(\n        \"div\",\n        { className: classesBar, ref: this.leftBar },\n        _react2.default.createElement(\"span\", { className: classesToogle, onClick: this.toggleMenu }),\n        _react2.default.createElement(\n          \"div\",\n          { className: \"collapsed-bar\", id: \"left-bar\" },\n          _react2.default.createElement(\"div\", { className: \"closes\", onClick: this.toggleMenu }),\n          _react2.default.createElement(_Nav2.default, null),\n          _react2.default.createElement(_Rooms2.default, null)\n        ),\n        _react2.default.createElement(_BarFooter2.default, null)\n      );\n    }\n  }]);\n  return LeftBar;\n}(_react.Component);\n\nexports.default = LeftBar;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kZXYvanMvY2hhdC9jb21wb25lbnQvbGVmdEJhci9pbmRleC5qcz80ODhmIl0sIm5hbWVzIjpbIkxlZnRCYXIiLCJwcm9wcyIsInN0YXRlIiwiaXNPcGVuIiwiaGFuZGxlQ2xvc2VNZW51IiwidGFyZ2V0IiwibGVmdEJhciIsImN1cnJlbnQiLCJjb250YWlucyIsInNldFN0YXRlIiwidG9nZ2xlTWVudSIsIlJlYWN0IiwiY3JlYXRlUmVmIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjbGFzc2VzQmFyIiwiYWN0aXZlIiwiY2xhc3Nlc1Rvb2dsZSIsInRvZ2dsZSIsImhpZGUiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU1BLE87OztBQUNKLG1CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsd0lBQ1hBLEtBRFc7O0FBQUEsVUFJbkJDLEtBSm1CLEdBSVg7QUFDTkMsY0FBUTtBQURGLEtBSlc7O0FBQUEsVUFnQm5CQyxlQWhCbUIsR0FnQkQsZ0JBQWdCO0FBQUEsVUFBYkMsTUFBYSxRQUFiQSxNQUFhOztBQUNoQyxVQUFJLENBQUMsTUFBS0MsT0FBTCxDQUFhQyxPQUFiLENBQXFCQyxRQUFyQixDQUE4QkgsTUFBOUIsQ0FBTCxFQUE0QztBQUMxQyxjQUFLSSxRQUFMLENBQWM7QUFDWk4sa0JBQVE7QUFESSxTQUFkO0FBR0Q7QUFDRixLQXRCa0I7O0FBQUEsVUF1Qm5CTyxVQXZCbUIsR0F1Qk4sWUFBTTtBQUNqQixZQUFLRCxRQUFMLENBQWM7QUFDWk4sZ0JBQVEsQ0FBQyxNQUFLRCxLQUFMLENBQVdDO0FBRFIsT0FBZDtBQUdELEtBM0JrQjs7QUFFakIsVUFBS0csT0FBTCxHQUFlSyxnQkFBTUMsU0FBTixFQUFmO0FBRmlCO0FBR2xCOzs7O3dDQUttQjtBQUNsQkMsYUFBT0MsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsS0FBS1YsZUFBdEM7QUFDQVMsYUFBT0MsZ0JBQVAsQ0FBd0IsVUFBeEIsRUFBb0MsS0FBS1YsZUFBekM7QUFDRDs7OzJDQUNzQjtBQUNyQlMsYUFBT0UsbUJBQVAsQ0FBMkIsT0FBM0IsRUFBb0MsS0FBS1gsZUFBekM7QUFDQVMsYUFBT0UsbUJBQVAsQ0FBMkIsVUFBM0IsRUFBdUMsS0FBS1gsZUFBNUM7QUFDRDs7OzZCQWNRO0FBQUEsVUFDQ0QsTUFERCxHQUNZLEtBQUtELEtBRGpCLENBQ0NDLE1BREQ7OztBQUdQLFVBQU1hLGFBQWEsMEJBQUc7QUFDcEIseUJBQWlCLElBREc7QUFFcEJDLGdCQUFRZDtBQUZZLE9BQUgsQ0FBbkI7QUFJQSxVQUFNZSxnQkFBZ0IsMEJBQUc7QUFDdkJDLGdCQUFRLElBRGU7QUFFdkJDLGNBQU1qQjtBQUZpQixPQUFILENBQXRCOztBQUtBLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBV2EsVUFBaEIsRUFBNEIsS0FBSyxLQUFLVixPQUF0QztBQUNFLGdEQUFNLFdBQVdZLGFBQWpCLEVBQWdDLFNBQVMsS0FBS1IsVUFBOUMsR0FERjtBQUVFO0FBQUE7QUFBQSxZQUFLLFdBQVUsZUFBZixFQUErQixJQUFHLFVBQWxDO0FBQ0UsaURBQUssV0FBVSxRQUFmLEVBQXdCLFNBQVMsS0FBS0EsVUFBdEMsR0FERjtBQUVFLHdDQUFDLGFBQUQsT0FGRjtBQUdFLHdDQUFDLGVBQUQ7QUFIRixTQUZGO0FBT0Usc0NBQUMsbUJBQUQ7QUFQRixPQURGO0FBV0Q7OztFQXJEbUJXLGdCOztrQkF3RFByQixPIiwiZmlsZSI6Ii4vZnJvbnRlbmQvZGV2L2pzL2NoYXQvY29tcG9uZW50L2xlZnRCYXIvaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQmFyRm9vdGVyIGZyb20gXCIuL0JhckZvb3RlclwiO1xuaW1wb3J0IE5hdiBmcm9tIFwiLi9OYXZcIjtcbmltcG9ydCBSb29tcyBmcm9tIFwiLi9Sb29tc1wiO1xuaW1wb3J0IGNuIGZyb20gXCJjbGFzc25hbWVzXCI7XG5cbmNsYXNzIExlZnRCYXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmxlZnRCYXIgPSBSZWFjdC5jcmVhdGVSZWYoKTtcbiAgfVxuICBzdGF0ZSA9IHtcbiAgICBpc09wZW46IGZhbHNlXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmhhbmRsZUNsb3NlTWVudSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLmhhbmRsZUNsb3NlTWVudSk7XG4gIH1cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmhhbmRsZUNsb3NlTWVudSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLmhhbmRsZUNsb3NlTWVudSk7XG4gIH1cbiAgaGFuZGxlQ2xvc2VNZW51ID0gKHsgdGFyZ2V0IH0pID0+IHtcbiAgICBpZiAoIXRoaXMubGVmdEJhci5jdXJyZW50LmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBpc09wZW46IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIHRvZ2dsZU1lbnUgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpc09wZW46ICF0aGlzLnN0YXRlLmlzT3BlblxuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGlzT3BlbiB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGNvbnN0IGNsYXNzZXNCYXIgPSBjbih7XG4gICAgICBcImxlZnQtc2lkZS1iYXJcIjogdHJ1ZSxcbiAgICAgIGFjdGl2ZTogaXNPcGVuXG4gICAgfSk7XG4gICAgY29uc3QgY2xhc3Nlc1Rvb2dsZSA9IGNuKHtcbiAgICAgIHRvZ2dsZTogdHJ1ZSxcbiAgICAgIGhpZGU6IGlzT3BlblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzQmFyfSByZWY9e3RoaXMubGVmdEJhcn0+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3Nlc1Rvb2dsZX0gb25DbGljaz17dGhpcy50b2dnbGVNZW51fSAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbGxhcHNlZC1iYXJcIiBpZD1cImxlZnQtYmFyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbG9zZXNcIiBvbkNsaWNrPXt0aGlzLnRvZ2dsZU1lbnV9IC8+XG4gICAgICAgICAgPE5hdiAvPlxuICAgICAgICAgIDxSb29tcyAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEJhckZvb3RlciAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMZWZ0QmFyO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./frontend/dev/js/chat/component/leftBar/index.js\n");

/***/ }),

/***/ "./frontend/dev/js/chat/index.js":
/*!***************************************!*\
  !*** ./frontend/dev/js/chat/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _component = __webpack_require__(/*! ./component */ \"./frontend/dev/js/chat/component/index.js\");\n\n__webpack_require__(/*! @fortawesome/fontawesome-free/css/all.min.css */ \"./node_modules/@fortawesome/fontawesome-free/css/all.min.css\");\n\n__webpack_require__(/*! ../../less/home/main.less */ \"./frontend/dev/less/home/main.less\");\n\n__webpack_require__(/*! ../../less/home/media.less */ \"./frontend/dev/less/home/media.less\");\n\n__webpack_require__(/*! root/bootstrap/dist/css/bootstrap.min.css */ \"./node_modules/bootstrap/dist/css/bootstrap.min.css\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//root - алиас для импорта\n_reactDom2.default.render(_react2.default.createElement(_component.App, null), document.getElementById(\"root-node\"));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kZXYvanMvY2hhdC9pbmRleC5qcz9jMDk4Il0sIm5hbWVzIjpbIlJlYWN0RE9NIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBRUE7O0FBSUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFBb0Q7QUFMcERBLG1CQUFTQyxNQUFULENBQWdCLDhCQUFDLGNBQUQsT0FBaEIsRUFBeUJDLFNBQVNDLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBekIiLCJmaWxlIjoiLi9mcm9udGVuZC9kZXYvanMvY2hhdC9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5cbmltcG9ydCB7IEFwcCB9IGZyb20gXCIuL2NvbXBvbmVudFwiO1xuXG5SZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290LW5vZGVcIikpO1xuXG5pbXBvcnQgXCJAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLm1pbi5jc3NcIjtcbmltcG9ydCBcIi4uLy4uL2xlc3MvaG9tZS9tYWluLmxlc3NcIjtcbmltcG9ydCBcIi4uLy4uL2xlc3MvaG9tZS9tZWRpYS5sZXNzXCI7XG5pbXBvcnQgXCJyb290L2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAubWluLmNzc1wiOyAvL3Jvb3QgLSDQsNC70LjQsNGBINC00LvRjyDQuNC80L/QvtGA0YLQsFxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./frontend/dev/js/chat/index.js\n");

/***/ }),

/***/ 10:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) *///# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd3MgKGlnbm9yZWQpP2FmMWEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiMTAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoaWdub3JlZCkgKi8iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///10\n");

/***/ }),

/***/ 9:
/*!*********************************************!*\
  !*** multi ./frontend/dev/js/chat/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/alexga/Desktop/chat_koa/frontend/dev/js/chat/index.js */"./frontend/dev/js/chat/index.js");


/***/ })

/******/ });
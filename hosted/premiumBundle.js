/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/helper.js":
/*!**************************!*\
  !*** ./client/helper.js ***!
  \**************************/
/***/ ((module) => {

eval("/* Takes in an error message. Sets the error message up in html, and\r\n   displays it to the user. Will be hidden by other events that could\r\n   end in an error.\r\n*/\nconst handleError = message => {\n  document.getElementById('errorMessage').textContent = message;\n  document.getElementById('postyMessage').classList.remove('hidden');\n};\n\n/* Sends post requests to the server using fetch. Will look for various\r\n   entries in the response JSON object, and will handle them appropriately.\r\n*/\nconst sendPost = async (url, data, handler) => {\n  const response = await fetch(url, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(data)\n  });\n  const result = await response.json();\n  document.getElementById('postyMessage').classList.add('hidden');\n  if (result.error) {\n    handleError(result.error);\n  }\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n  if (handler) {\n    handler(result);\n  }\n};\nconst hideError = () => {\n  document.getElementById('postyMessage').classList.add('hidden');\n};\nmodule.exports = {\n  handleError,\n  sendPost,\n  hideError\n};\n\n//# sourceURL=webpack://postitpage/./client/helper.js?");

/***/ }),

/***/ "./client/premium.jsx":
/*!****************************!*\
  !*** ./client/premium.jsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const helper = __webpack_require__(/*! ./helper.js */ \"./client/helper.js\");\nconst handlePremium = e => {\n  e.preventDefault();\n  helper.hideError();\n  const premium = e.target.querySelector('#premiumCheck').checked;\n  const _csrf = e.target.querySelector(\"#_csrf\").value;\n  helper.sendPost(e.target.action, {\n    premium,\n    _csrf\n  });\n  return false;\n};\nconst PremiumForm = props => {\n  return /*#__PURE__*/React.createElement(\"form\", {\n    id: \"premiumForm\",\n    onSubmit: handlePremium,\n    name: \"premiumForm\",\n    action: \"/premium\",\n    method: \"POST\",\n    className: \"premiumForm\"\n  }, /*#__PURE__*/React.createElement(\"div\", {\n    className: \"formHolder\"\n  }, /*#__PURE__*/React.createElement(\"p\", null, \"Purchase a subscription for the Premium service to enjoy a cooler site experience!\"), /*#__PURE__*/React.createElement(\"label\", {\n    id: \"premLabel\",\n    htmlFor: \"name\"\n  }, \"Toggle Premium: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"premiumCheck\",\n    type: \"checkbox\",\n    name: \"premium\",\n    defaultChecked: false\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"_csrf\",\n    type: \"hidden\",\n    name: \"_csrf\",\n    value: props.csrf\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    className: \"formSubmit\",\n    type: \"submit\",\n    value: \"Change Effect\"\n  })));\n};\nconst init = async () => {\n  const response = await fetch('/getToken');\n  const data = await response.json();\n  ReactDOM.render( /*#__PURE__*/React.createElement(PremiumForm, {\n    csrf: data.csrfToken\n  }), document.getElementById('content'));\n  const account = await fetch('/getAccount');\n  const accData = await account.json();\n  let checkbox = document.querySelector('#premiumCheck');\n  if (accData.account.premium) {\n    checkbox.defaultChecked = true;\n  }\n};\nwindow.onload = init;\n\n//# sourceURL=webpack://postitpage/./client/premium.jsx?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/premium.jsx");
/******/ 	
/******/ })()
;
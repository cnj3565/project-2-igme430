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

/***/ "./client/settings.jsx":
/*!*****************************!*\
  !*** ./client/settings.jsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const helper = __webpack_require__(/*! ./helper.js */ \"./client/helper.js\");\nconst handleChange = e => {\n  e.preventDefault();\n  helper.hideError();\n  const username = e.target.querySelector('#user').value;\n  const pass = e.target.querySelector('#pass').value;\n  const newPass = e.target.querySelector('#newPass').value;\n  const newPass2 = e.target.querySelector('#newPass2').value;\n  const _csrf = e.target.querySelector('#_csrf').value;\n  if (!username || !pass || !newPass) {\n    helper.handleError('All fields are required!');\n    return false;\n  }\n  if (newPass !== newPass2) {\n    helper.handleError('New passwords do not match!');\n    return false;\n  }\n  if (pass === newPass) {\n    return res.status(400).json({\n      error: 'New password is the same as the old password!'\n    });\n  }\n  helper.sendPost(e.target.action, {\n    username,\n    pass,\n    _csrf\n  });\n  return false;\n};\nconst SettingsWindow = props => {\n  return /*#__PURE__*/React.createElement(\"form\", {\n    id: \"pwChangeForm\",\n    name: \"pwChangeForm\",\n    onSubmit: handleChange,\n    action: \"/pwChange\",\n    method: \"POST\",\n    className: \"mainForm\"\n  }, /*#__PURE__*/React.createElement(\"div\", {\n    className: \"formHolder\"\n  }, /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"username\"\n  }, \"Username: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"user\",\n    type: \"text\",\n    name: \"username\",\n    placeholder: \"username\"\n  }), /*#__PURE__*/React.createElement(\"br\", null), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"pass\"\n  }, \"Current Password: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"pass\",\n    type: \"password\",\n    name: \"pass\",\n    placeholder: \"current password\"\n  }), /*#__PURE__*/React.createElement(\"br\", null), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"newPass\"\n  }, \"New Password: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"newPass\",\n    type: \"password\",\n    name: \"newPass\",\n    placeholder: \"new password\"\n  }), /*#__PURE__*/React.createElement(\"br\", null), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"newPass2\"\n  }, \"Retype New Password: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"newPass2\",\n    type: \"password\",\n    name: \"newPass2\",\n    placeholder: \"retype new password\"\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"_csrf\",\n    type: \"hidden\",\n    name: \"_csrf\",\n    value: props.csrf\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    className: \"formSubmit\",\n    type: \"submit\",\n    value: \"Change Password\"\n  })));\n};\nconst init = async () => {\n  const response = await fetch('/getToken');\n  const data = await response.json();\n  ReactDOM.render( /*#__PURE__*/React.createElement(SettingsWindow, {\n    csrf: data.csrfToken\n  }), document.getElementById('content'));\n};\nwindow.onload = init;\n\n//# sourceURL=webpack://postitpage/./client/settings.jsx?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./client/settings.jsx");
/******/ 	
/******/ })()
;
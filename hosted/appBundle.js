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

/***/ "./client/maker.jsx":
/*!**************************!*\
  !*** ./client/maker.jsx ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const helper = __webpack_require__(/*! ./helper.js */ \"./client/helper.js\");\nconst handlePostit = e => {\n  e.preventDefault();\n  helper.hideError();\n  const title = e.target.querySelector('#postitTitle').value;\n  const content = e.target.querySelector(\"#postitContent\").value;\n  const _csrf = e.target.querySelector(\"#_csrf\").value;\n  if (!title || !content) {\n    helper.handleError('All fields are required!');\n    return false;\n  }\n  helper.sendPost(e.target.action, {\n    title,\n    content,\n    _csrf\n  }, loadPostitsFromServer);\n  return false;\n};\nconst PostitForm = props => {\n  return /*#__PURE__*/React.createElement(\"form\", {\n    id: \"postitForm\",\n    onSubmit: handlePostit,\n    name: \"postitForm\",\n    action: \"/maker\",\n    method: \"POST\",\n    className: \"postitForm\"\n  }, /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"title\"\n  }, \"Your Post's Title: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"postitTitle\",\n    type: \"text\",\n    name: \"title\",\n    placeholder: \"My Title\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"content\"\n  }, \"Write Your Post Here: \"), /*#__PURE__*/React.createElement(\"textarea\", {\n    id: \"postitContent\",\n    cols: \"40\",\n    rows: \"10\",\n    type: \"text\",\n    name: \"content\"\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"_csrf\",\n    type: \"hidden\",\n    name: \"_csrf\",\n    value: props.csrf\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    className: \"makePostitSubmit\",\n    type: \"submit\",\n    value: \"Make Postit\"\n  }))\n  // the page should automatically detect username - no field necessary\n  ;\n};\n\nconst PostitList = props => {\n  if (props.postits.length === 0) {\n    return /*#__PURE__*/React.createElement(\"div\", {\n      className: \"postitList\"\n    }, /*#__PURE__*/React.createElement(\"h3\", {\n      className: \"emptyPostit\"\n    }, \"No Posts Have Been Made Yet!\"));\n  }\n\n  // Find a way to return postits in reverse chronological order, maybe\n  const postitNodes = props.postits.map(postit => {\n    return /*#__PURE__*/React.createElement(\"div\", {\n      key: postit._id,\n      className: \"postit\"\n    }, /*#__PURE__*/React.createElement(\"h2\", {\n      className: \"postitTitle\"\n    }, \" \", postit.title, \" \"), /*#__PURE__*/React.createElement(\"br\", null), /*#__PURE__*/React.createElement(\"p\", {\n      className: \"postitContent\"\n    }, \" \", postit.content, \" \"), /*#__PURE__*/React.createElement(\"br\", null), /*#__PURE__*/React.createElement(\"footer\", {\n      className: \"postitAuthor\"\n    }, \" Written by \", postit.author, \" \"));\n  });\n  return /*#__PURE__*/React.createElement(\"div\", {\n    className: \"postitList\"\n  }, postitNodes);\n};\nconst loadPostitsFromServer = async () => {\n  const response = await fetch('/getPostits');\n  const data = await response.json();\n  ReactDOM.render( /*#__PURE__*/React.createElement(PostitList, {\n    postits: data.postits\n  }), document.getElementById('postitFeed'));\n};\nconst init = async () => {\n  const response = await fetch('/getToken');\n  const data = await response.json();\n  ReactDOM.render( /*#__PURE__*/React.createElement(PostitForm, {\n    csrf: data.csrfToken\n  }), document.getElementById('makePostit'));\n  ReactDOM.render( /*#__PURE__*/React.createElement(PostitList, {\n    postits: []\n  }), document.getElementById('postitFeed'));\n  loadPostitsFromServer();\n};\nwindow.onload = init;\n\n//# sourceURL=webpack://postitpage/./client/maker.jsx?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./client/maker.jsx");
/******/ 	
/******/ })()
;
(function (depsGrapth) {
  function require(filePath) {
    function absRequire(relativePath) {
      return require(depsGrapth[filePath].deps[relativePath]);
    }
    const exports = {};
    (function (code, require, exports) {
      eval(code);
    })(depsGrapth[filePath].code, absRequire, exports);
    return exports;
  }
  require('./src/index.js');
})({
  "./src/index.js": {
    deps: { "./add": "./src\\add.js", "./minus": "./src\\minus.js" },
    code: '"use strict";\n\nvar _add = _interopRequireDefault(require("./add"));\n\nvar _minus = require("./minus");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n\nvar sum = (0, _add["default"])(1, 2);\nvar division = (0, _minus.minus)(3, 1);\nconsole.log(sum);\nconsole.log(division);',
  },
  "./src\\add.js": {
    deps: {},
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports["default"] = void 0;\n\nvar _default = function _default(a, b) {\n  return a + b;\n};\n\nexports["default"] = _default;',
  },
  "./src\\minus.js": {
    deps: {},
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.minus = void 0;\n\nvar minus = function minus(a, b) {\n  return a - b;\n};\n\nexports.minus = minus;',
  },
});

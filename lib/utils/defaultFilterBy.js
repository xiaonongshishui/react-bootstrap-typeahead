'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _some2 = require('lodash/some');

var _some3 = _interopRequireDefault(_some2);

exports.default = defaultFilterBy;

var _warn = require('./warn');

var _warn2 = _interopRequireDefault(_warn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isMatch(input, string, caseSensitive) {
  if (!caseSensitive) {
    input = input.toLowerCase();
    string = string.toLowerCase();
  }
  return string.indexOf(input) !== -1;
}

/**
 * Default algorithm for filtering results.
 */
function defaultFilterBy(option, labelKey, isTokenized, text, filterOptions) {
  // Don't show selected options in the menu for the multi-select case.
  if (isTokenized) {
    return false;
  }

  var caseSensitive = filterOptions.caseSensitive;

  var fields = filterOptions.fields.slice();

  // Add the `labelKey` field to the list of fields if it isn't already there.
  if (fields.indexOf(labelKey) === -1) {
    fields.unshift(labelKey);
  }

  if (typeof option === 'string') {
    (0, _warn2.default)(fields.length === 1, 'You cannot filter by properties when `option` is a string.');

    return isMatch(text, option, caseSensitive);
  }

  return (0, _some3.default)(fields, function (field) {
    var value = option[field];

    if (typeof value !== 'string') {
      (0, _warn2.default)(false, 'Fields passed to `filterBy` should have string values. Value will ' + 'be converted to a string; results may be unexpected.');

      // Coerce to string since `toString` isn't null-safe.
      value = value + '';
    }

    return isMatch(text, value, caseSensitive);
  });
}
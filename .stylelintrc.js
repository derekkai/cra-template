/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

// stylelint configuration
// https://stylelint.io/user-guide/configuration/
module.exports = {
  // The standard config based on a handful of CSS style guides
  // https://github.com/stylelint/stylelint-config-standard

  // https://github.com/prettier/prettier-vscode/issues/319
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],

  plugins: [
    // A collection of SCSS specific linting rules for stylelint (in a form of a plugin)
    // https://www.npmjs.com/package/stylelint-scss
    'stylelint-scss',
    // stylelint plugin to sort CSS rules content with specified order
    // https://github.com/hudochenkov/stylelint-order
    'stylelint-order',
  ],

  rules: {
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          // CSS Modules composition
          // https://github.com/css-modules/css-modules#composition
          'composes',
        ],
      },
    ],
    'rule-empty-line-before': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          // Ignore for scss
          // https://stylelint.io/user-guide/rules/at-rule-no-unknown/
          'mixin',
          'include',
          'each',
          'function',
          'return',
          'if',
          'else',
          'for',
        ],
      },
    ],

    'at-rule-empty-line-before': null,
    'block-closing-brace-newline-after': null,

    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          // CSS Modules :global scope
          // https://github.com/css-modules/css-modules#exceptions
          'global',
        ],
      },
    ],

    // Opinionated rule, you can disable it if you want
    'string-quotes': 'single',

    // https://github.com/hudochenkov/stylelint-order/blob/master/rules/order/README.md
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'declarations',
      'at-rules',
      'rules',
    ],

    // https://github.com/hudochenkov/stylelint-order/blob/master/rules/properties-order/README.md
    'order/properties-order': [],

    'value-keyword-case': null,

    'no-descending-specificity': null,
  },
}

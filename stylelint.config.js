module.exports = {
  extends: ['stylelint-config-css-modules', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'order/properties-alphabetical-order': true,
  },
};

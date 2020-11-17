module.exports = {
  extends: 'stylelint-prettier/recommended',
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'order/properties-alphabetical-order': true,
  },
};

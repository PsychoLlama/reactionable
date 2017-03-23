const eslint = exports;

eslint.extends = [
  'eslint:recommended',
  'llama',
];

eslint.env = {
  browser: true,
  node: true,
};

eslint.parserOptions = {
  sourceType: 'module',
};

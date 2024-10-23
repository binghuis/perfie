export default {
  '*.{md,json}': ['prettier --write --no-error-on-unmatched-pattern'],
  '*.{mjs,cjs,js,ts}': ['eslint --fix', 'prettier --write'],
};

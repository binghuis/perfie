export default {
  '*.{md,json}': ['prettier --cache --write --no-error-on-unmatched-pattern'],
  '*.{js}': ['eslint --fix', 'prettier --cache --write'],
  '*.{ts}': ['eslint --fix', 'prettier --cache --parser=typescript --write'],
};

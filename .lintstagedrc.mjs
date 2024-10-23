export default {
  '*.{md,json}': ['npm run format --no-error-on-unmatched-pattern'],
  '*.{js}': ['npm run lint', 'npm run format'],
  '*.{ts}': ['npm run lint', 'npm run format --parser=typescript'],
};

export default {
  '**/*/*.{md,json}': ['npm run format --no-error-on-unmatched-pattern'],
  '**/*/*.{mjs,cjs,js,ts}': ['npm run lint', 'npm run format'],
};

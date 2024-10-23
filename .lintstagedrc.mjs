export default {
  '**/*/*.{md,json}': ['npm run format --no-error-on-unmatched-pattern'],
  '**/*/*.js': ['eslint --fix', 'npm run format'],
  '**/*/*.ts': ['eslint --fix', 'npm run format --parser=typescript'],
};

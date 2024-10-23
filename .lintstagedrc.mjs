export default {
  '**/*/*.{md,json}': ['npm run format --no-error-on-unmatched-pattern'],
  '**/*/*.js': ['eslint "{src,apps,libs,test}/**/*.ts" --fix', 'npm run format'],
  '**/*/*.ts': ['eslint "{src,apps,libs,test}/**/*.ts" --fix', 'npm run format --parser=typescript'],
};

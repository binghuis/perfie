import * as fs from 'fs';
import * as path from 'path';

const modulesDir = path.join(__dirname, '../src/modules');
const outputFile = path.join(__dirname, '../src/modules.enum.ts');

const modules = fs
  .readdirSync(modulesDir)
  .filter((file) => fs.statSync(path.join(modulesDir, file)).isDirectory());

const enumContent = `export enum Modules {
  ${modules.map((module) => `${module.toUpperCase()} = '${module}'`).join(',\n  ')}
}`;

fs.writeFileSync(outputFile, enumContent);
console.log('Modules enum generated successfully.');

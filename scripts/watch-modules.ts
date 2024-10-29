import fs from 'node:fs';
import path from 'node:path';
import chokidar from 'chokidar';
import { consola } from 'consola';
import fg from 'fast-glob';

const modulesDir = path.join(__dirname, '../src/modules');
const modulesEnumFile = path.join(__dirname, '../src/generated/modules.enum.ts');

function extractModuleName(filePath: string): string {
  const fileName = path.basename(filePath);
  const match = fileName.match(/^(.*)\.module\.ts$/);
  return match ? match[1] : '';
}

function extractFileName(filePath: string): string {
  const parts = filePath.split(path.sep);
  return `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
}

function updateEnums() {
  const modules = fg.globSync(path.join(modulesDir, '**/*/*.module.ts'), {
    onlyFiles: true,
    unique: true,
    caseSensitiveMatch: false,
  });

  const moduleNames = modules.map((path) => extractModuleName(path));

  const modulesEnumContent = `export enum Modules {
  ${moduleNames.map((name) => `${name.toUpperCase()} = '${name}',`).join(',\n')}
}`;

  fs.writeFileSync(modulesEnumFile, modulesEnumContent);
  consola.success('更新文件:', extractFileName(modulesEnumFile));
}

const watcher = chokidar.watch(`${modulesDir}`, {
  ignored: (path, stats) => stats?.isFile() && !path.endsWith('module.ts'),
  persistent: true,
});

watcher
  .on('error', (error) => {
    consola.error('modules 监听程序出错:', error);
  })
  .on('ready', () => {
    consola.start('modules 监听程序已准备就绪');
  })
  .on('add', (path) => {
    consola.success('添加模块:', extractModuleName(path));
    updateEnums();
  })
  .on('rename', (path) => {
    consola.success('重命名模块:', extractModuleName(path));
    updateEnums();
  })
  .on('unlink', (path) => {
    consola.success('移除模块:', extractModuleName(path));
    updateEnums();
  });

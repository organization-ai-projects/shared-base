import fs from 'fs';
import path from 'path';

const SRC_DIR = path.join(__dirname, 'src');
const INDEX_FILE = path.join(SRC_DIR, 'index.ts');

function getExportsFromFolder(folder: string, relativePath: string): string[] {
  const folderPath = path.join(SRC_DIR, folder);
  if (!fs.existsSync(folderPath)) return [];

  return fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith('.ts') && file !== 'index.ts')
    .map((file) => `export * from '${relativePath}/${file.replace('.ts', '')}';`);
}

function generateIndex(): void {
  let content = `// Auto-generated index.ts\n\n`;

  const utilsExports = getExportsFromFolder('utils', './utils');
  if (utilsExports.length) {
    content += `// Export des utilitaires\n${utilsExports.join('\n')}\n\n`;
  }

  content += `// Export des constantes\nexport * from './constants';\n\n`;

  content += `// Export des types\nexport { DeepPartial as TypesDeepPartial } from './types';\n\n`;

  const testMocksExports = getExportsFromFolder('tests/mocks', './tests/mocks');
  if (testMocksExports.length) {
    content += `// Export des mocks pour les tests\n${testMocksExports.join('\n')}\n`;
  }

  fs.writeFileSync(INDEX_FILE, content, 'utf8');
}

generateIndex();

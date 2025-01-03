import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, 'src');
const INDEX_FILE = path.join(SRC_DIR, 'index.ts');

function ensureRelativePath(relativePath: string): string {
  return relativePath.startsWith('./') ? relativePath : `./${relativePath}`;
}

function getExportsFromFolder(
  folderPath: string,
  relativePath: string,
  excludedFolders: string[] = ['tests', 'mocks'],
): string[] {
  if (!fs.existsSync(folderPath)) return [];

  const exports: string[] = [];
  const exportedMembers = new Map<string, string>();

  fs.readdirSync(folderPath, { withFileTypes: true }).forEach((entry) => {
    const entryPath = path.join(folderPath, entry.name);
    const entryRelativePath = ensureRelativePath(
      path.join(relativePath, entry.name).replace(/\\/g, '/'),
    );

    if (entry.isDirectory()) {
      if (!excludedFolders.includes(entry.name)) {
        exports.push(...getExportsFromFolder(entryPath, entryRelativePath, excludedFolders));
      }
    } else if (
      entry.isFile() &&
      entry.name.endsWith('.ts') &&
      entry.name !== 'index.ts' &&
      !entry.name.includes('.test')
    ) {
      const exportPath = entryRelativePath.replace('.ts', '');
      const fileContent = fs.readFileSync(entryPath, 'utf8');
      const matches = fileContent.match(/export\s+(const|function|class|interface|type)\s+(\w+)/g);

      if (matches) {
        matches.forEach((match) => {
          const [, , memberName] = match.split(/\s+/);
          if (memberName && exportedMembers.has(memberName)) {
            const aliasName = `${memberName}From${path.basename(entry.name, '.ts')}`
              .replace(/([a-z])([A-Z])/g, '$1$2')
              .replace(/[^a-zA-Z0-9]/g, '');
            if (!exports.find((exp) => exp.includes(`as ${aliasName}`))) {
              exports.push(`export { ${memberName} as ${aliasName} } from '${exportPath}';`);
            }
          } else if (memberName) {
            exportedMembers.set(memberName, exportPath);
          }
        });
      }

      if (!exports.find((exp) => exp.includes(`from '${exportPath}'`))) {
        exports.push(`export * from '${exportPath}';`);
      }
    }
  });

  return exports.sort();
}

function generateIndex(): void {
  let content = '// Auto-generated index.ts\n\n';

  const utilsExports = getExportsFromFolder(path.join(SRC_DIR, 'utils'), './utils');
  if (utilsExports.length) {
    content += `${utilsExports.join('\n')}\n\n`;
  }

  content += "export * from './constants';\n\n";
  content += "export { DeepPartial as TypesDeepPartial } from './types';\n\n";

  fs.writeFileSync(INDEX_FILE, content, 'utf8');
}

generateIndex();

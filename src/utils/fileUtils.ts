import fs from 'fs';

export const readFile = (path: string): string => fs.readFileSync(path, 'utf-8');
export const writeFile = (path: string, data: string): void => fs.writeFileSync(path, data);
export const deleteFile = (path: string): void => fs.unlinkSync(path);

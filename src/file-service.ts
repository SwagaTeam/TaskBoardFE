import path from 'path';
import fs from 'fs';

const getAbsolutePath = (relativePath: string, type: 'avatar' | 'doc' | 'attachment') => {
    const basePath = process.env[`${type.toUpperCase()}_STORAGE_PATH`] || '/app';
    return path.join(basePath, relativePath);
};

export const readFile = (relativePath: string, type: 'avatar' | 'doc' | 'attachment') => {
    const filePath = getAbsolutePath(relativePath, type);
    return fs.readFileSync(filePath);
};

export const fileExists = (relativePath: string, type: 'avatar' | 'doc' | 'attachment') => {
    const filePath = getAbsolutePath(relativePath, type);
    return fs.existsSync(filePath);
};

export const saveFile = (relativePath: string, buffer: Buffer, type: 'avatar' | 'doc' | 'attachment') => {
    const filePath = getAbsolutePath(relativePath, type);
    fs.writeFileSync(filePath, buffer);
};

#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

createIndexFile(process.cwd());

/**
 * creates a index file per each folder
 * @param {String} filePath
 */
function createIndexFile(filePath) {
    const files = fs.readdirSync(filePath);
    files.forEach(fileOrDirectory => {
        if (fs.lstatSync(path.join(filePath, fileOrDirectory)).isDirectory()) {
            createIndexFile(path.join(filePath, fileOrDirectory));
        }
    });
    if (!fs.existsSync(path.join(filePath, 'index.ts')))
        fs.writeFileSync(path.join(filePath, 'index.ts'), files.filter(file => file.endsWith('.ts') || file.indexOf('.') == -1).map(file => `export * from './${file.replace(/\.ts$/, '')}';`).join('\n'));
}
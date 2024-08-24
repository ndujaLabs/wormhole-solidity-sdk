const fs = require('fs');
const path = require('path');

const contractsDir = path.join(__dirname, '../contracts');

const [,,silent] = process.argv;

function fixDependencies(dirPath, level = 0) {
    fs.readdir(dirPath, { withFileTypes: true }, (err, entries) => {
        if (err) {
            console.error(`Error reading the directory ${dirPath}:`, err);
            return;
        }

        entries.forEach((entry) => {
            const entryPath = path.join(dirPath, entry.name);
            if (entry.isDirectory()) {
                // If entry is a directory, recurse into it
                fixDependencies(entryPath, level + 1);
            } else if (path.extname(entry.name) === '.sol') {
                // Process .sol files
                fs.readFile(entryPath, 'utf8', (err, data) => {
                    if (err) {
                        console.error(`Error reading file ${entry.name}:`, err);
                        return;
                    }
                    let updatedContent = undefined;
                    let parts = data.split('import "wormhole-sdk/');
                    if (parts.length > 1) {
                        const prefix = level === 3 ? '../../../' : level === 2 ? '../../' : level === 1 ? '../' : './';
                        updatedContent = parts.join(`import "${prefix}`);
                    }
                    parts = (updatedContent || data).split(' from "wormhole-sdk/');
                    if (parts.length > 1) {
                        const prefix = level === 3 ? '../../../' : level === 2 ? '../../' : level === 1 ? '../' : './';
                        updatedContent = parts.join(` from "${prefix}`);
                    }

                    if (updatedContent) {
                        fs.writeFile(entryPath, updatedContent, 'utf8', (err) => {
                            if (err) {
                                console.error(`Error writing file ${entry.name}:`, err);
                                return;
                            }
                            if (!silent) console.log(`Fixing ${entry.name}`);
                        });
                    }
                });
            }
        });
    });
}

// Start processing from the contracts directory
fixDependencies(contractsDir);

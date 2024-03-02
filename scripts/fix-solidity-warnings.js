const fs = require('fs');
const path = require('path');

const contractsDir = path.join(__dirname, '../contracts');
const licenseIdentifier = '// SPDX-License-Identifier: Apache-2.0\n';

function addLicenseToSolFiles(dirPath) {
    fs.readdir(dirPath, { withFileTypes: true }, (err, entries) => {
        if (err) {
            console.error(`Error reading the directory ${dirPath}:`, err);
            return;
        }

        entries.forEach((entry) => {
            const entryPath = path.join(dirPath, entry.name);
            if (entry.isDirectory()) {
                // If entry is a directory, recurse into it
                addLicenseToSolFiles(entryPath);
            } else if (path.extname(entry.name) === '.sol') {
                // Process .sol files
                fs.readFile(entryPath, 'utf8', (err, data) => {
                    if (err) {
                        console.error(`Error reading file ${entry.name}:`, err);
                        return;
                    }

                    if (!/SPDX-License-Identifier/.test(data)) {
                        const updatedContent = licenseIdentifier + data;
                        fs.writeFile(entryPath, updatedContent, 'utf8', (err) => {
                            if (err) {
                                console.error(`Error writing file ${entry.name}:`, err);
                                return;
                            }
                            console.log(`License identifier added to ${entry.name}`);
                        });
                    }
                });
            }
        });
    });
}

// Start processing from the contracts directory
addLicenseToSolFiles(contractsDir);

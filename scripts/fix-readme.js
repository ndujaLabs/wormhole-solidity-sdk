const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function ellipsiseGitHash(hash) {
    return hash.length > 8 ? `${hash.substring(0, 4)}...${hash.substring(hash.length - 4)}` : hash;
}

const command = `git submodule status wormhole-solidity-sdk | awk '{ print $1 }'`;
const hash = execSync(command).toString().trim();

const readmePath = path.join(__dirname, '../contracts/README.md');

let readmeContent = fs.readFileSync(readmePath, 'utf8').split("\n");

let insertText = `\n\n---\n\n### _This version of the Wormhole Solidity SDK, configured by [ndujaLabs](https://ndujalabs.com) for Hardhat compatibility, incorporates the original SDK as a submodule. It aligns with commit [${ellipsiseGitHash(hash)}](https://github.com/wormhole-foundation/wormhole-solidity-sdk/tree/${hash})._\n\n---\n\n`;

readmeContent.splice(1, 0, insertText);
let updatedReadmeContent = readmeContent.join("\n");
fs.writeFileSync(readmePath, updatedReadmeContent, 'utf8');

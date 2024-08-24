#!/usr/bin/env bash

root_dir=$(dirname $(realpath $(dirname "$0")))
# if not run from the root, we cd into the root
cd $root_dir

cd wormhole-solidity-sdk
git pull origin main
forge install
#forge compile
#forge test
cd ..

if [[ -d "contracts" ]]; then
  rm -rf contracts/*
else
  mkdir contracts
fi

cp -r wormhole-solidity-sdk/src/* contracts/.
rm -r contracts/testing
node scripts/fix-solidity-dependencies.js

#cp -r hello-wormhole-contracts/* contracts/.

cp wormhole-solidity-sdk/README.md contracts/.
node scripts/fix-readme.js
cp contracts/README.md .
cp scripts/package.json contracts/.

node scripts/fix-solidity-warnings.js $1

npx hardhat compile


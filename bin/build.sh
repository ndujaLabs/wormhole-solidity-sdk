#!/usr/bin/env bash

root_dir=$(dirname $(realpath $(dirname "$0")))
# if not run from the root, we cd into the root
cd $root_dir

if [[ -d "contracts" ]]; then
  rm -rf contracts/*
else
  mkdir contracts
fi

cp -r wormhole-solidity-sdk/src/* contracts/.
cp -r hello-wormhole-contracts/* contracts/.
rm -r contracts/testing
cp README.md contracts/.
cp scripts/package.json contracts/.

node scripts/fix-solidity-warnings.js

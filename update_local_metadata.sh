#!/usr/bin/env bash

#
# This script copies the contract metadata and addresses from the aleph-node repository as well as generates TS definition based on the metadata
#
# You might have to adjust the paths to match your directories.

set -euo pipefail

function copy_metadata() {
  cp ../aleph-node/contracts/$1/target/ink/$1.json src/abi/$1.json;
  npx squid-ink-typegen --abi src/abi/$1.json --output src/abi/$1.ts
  echo "Updated $1 ABI."
}

CONTRACTS=(button)
for C in "${CONTRACTS[@]}"; do
  copy_metadata $C
done

cp ../aleph-node/contracts/addresses.json src/addresses/addresses.json
echo "Updated contracts addresses"

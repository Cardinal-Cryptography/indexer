#!/usr/bin/env sh

if [[ "${INDEXER_ENV}" == "featurenet" ]]; then
  ADDR_SRC="/squid/lib/metadata/addresses.json"
  ADDR_DST="/squid/lib/addresses/addresses.json"
  echo "'featurenet' environment is set, checking for addresses.json downloaded from S3..."
  if [[ -f "${ADDR_SRC}" ]]; then
    echo "Copying ${ADDR_SRC} to ${ADDR_DST}..."
    cp "${ADDR_SRC}" "${ADDR_DST}"
  fi
fi

exec "$@"


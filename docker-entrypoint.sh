#!/usr/bin/env sh

if [[ "${INDEXER_ENV}" == "featurenet" ]]; then
  ADDR_SRC="/squid/lib/metadata/addresses.json"
  ADDR_DST="/squid/lib/addresses/addresses.json"
  if [[ -f "${ADDR_SRC}" ]]; then
    cp "${ADDR_SRC}" "${ADDR_DST}"
  fi
fi

exec "$@"
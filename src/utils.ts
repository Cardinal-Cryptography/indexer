import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';

// Encodes account address as hex string.
export function account2hex(account: string): string {
  return u8aToHex(decodeAddress(account));
}

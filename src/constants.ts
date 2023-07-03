import addresses from './addresses/index';
import { account2hex } from './utils';

export const EARLY_BIRD_SPECIAL_CONTRACT_ADDRESS = account2hex(addresses.early_bird_special);
export const BACK_TO_THE_FUTURE_CONTRACT_ADDRESS = account2hex(addresses.back_to_the_future);
export const THE_PRESSIAH_COMETH_CONTRACT_ADDRESS = account2hex(addresses.the_pressiah_cometh);

export const CONTRACT_ADDRESSES = [
  EARLY_BIRD_SPECIAL_CONTRACT_ADDRESS,
  BACK_TO_THE_FUTURE_CONTRACT_ADDRESS,
  THE_PRESSIAH_COMETH_CONTRACT_ADDRESS,
];

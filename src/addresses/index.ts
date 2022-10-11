import devAddresses from './addresses.json';
import testnetAddresses from './addresses.testnet.json';
import mainnetAddresses from './addresses.mainnet.json';

let addresses: any;
switch (process.env.INDEXER_ENV) {
    case "featurenet":
        addresses = devAddresses
        break;
    case "testnet":
        addresses =  testnetAddresses
        break;
    case "mainnet":
        addresses = mainnetAddresses
        break;
    default:
        addresses = devAddresses
}

export default addresses

const { types } = require('hardhat/config');
const { HardhatPluginError } = require('hardhat/plugins');
const { stringifyUrl } = require('query-string');

const API_ENDPOINT = 'https://txn.xyz/v0/decode/';

subtask('txn-dot-xyz-encode')
  .addOptionalParam('chainId', 'Target chain ID', undefined, types.int)
  .addParam('contractAddress', 'Target address', undefined, types.string)
  .addOptionalParam('fn', 'Target function name', undefined, types.string)
  .addOptionalParam(
    'fnParams',
    'Target function call arguments',
    [],
    types.json,
  )
  .setAction(async function (args, hre) {
    if (!Array.isArray(args.fnParams)) {
      throw new HardhatPluginError('fnParams must be array');
    }

    const query = {
      contractAddress: args.contractAddress,
      fn: args.fn,
    };

    // note case change in variable name (chainId => chainID)
    if (args.chainId) {
      query.chainID = args.chainId;
    } else {
      query.chainID = parseInt(await hre.network.provider.send('eth_chainId'));
    }

    if (args.fnParams.length) {
      query.fnParams = args.fnParams
        .map((arg, index) => `${index}=${arg}`)
        .join(',');
    }

    return stringifyUrl({ url: API_ENDPOINT, query });
  });

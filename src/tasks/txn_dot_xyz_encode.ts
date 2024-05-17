import { subtask, types } from 'hardhat/config';
import { HardhatPluginError } from 'hardhat/plugins';
import queryString from 'query-string';

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

    const query: {
      contractAddress: string;
      fn: string;
      fnParams?: string;
      chainID: number;
    } = {
      contractAddress: args.contractAddress,
      fn: args.fn,
      // note case change in variable name (chainId => chainID)
      chainID:
        args.chainId ??
        parseInt(await hre.network.provider.send('eth_chainId')),
    };

    if (args.fnParams.length) {
      query.fnParams = (args.fnParams as string[])
        .map((arg, index) => `${index}=${arg}`)
        .join(',');
    }

    return queryString.stringifyUrl({ url: API_ENDPOINT, query });
  });

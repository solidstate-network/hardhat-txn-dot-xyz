import pkg from '../../package.json';
import { TASK_TXN_DOT_XYZ_ENCODE } from '../task_names.js';
import { task } from 'hardhat/config';
import { HardhatPluginError } from 'hardhat/plugins';
import { ArgumentType } from 'hardhat/types/arguments';
import queryString from 'query-string';

const API_ENDPOINT = 'https://txn.xyz/v0/decode/';

export default task(TASK_TXN_DOT_XYZ_ENCODE)
  .addPositionalArgument({
    name: 'contractAddress',
    description: 'Target address',
  })
  .addPositionalArgument({
    name: 'fn',
    description: 'Target function name',
    defaultValue: undefined,
  })
  .addVariadicArgument({
    name: 'fnParams',
    description: 'Target function call arguments',
    // defaultValue: [],
    // types.json,
  })
  .addOption({
    name: 'chainId',
    description: 'Target chain ID',
    defaultValue: 0,
    type: ArgumentType.INT,
  })
  // .addOptionalParam('abi', 'Contract ABI', undefined, types.json)
  .setAction(async (args, hre) => {
    if (!Array.isArray(args.fnParams)) {
      throw new HardhatPluginError(pkg.name, 'fnParams must be array');
    }

    const query: {
      contractAddress: string;
      fn: string;
      fnParams?: string;
      chainID: number;
      abi: string;
    } = {
      contractAddress: args.contractAddress,
      fn: args.fn,
      // note case change in variable name (chainId => chainID)
      chainID:
        args.chainId ??
        parseInt(await hre.network.provider.send('eth_chainId')),
      abi: JSON.stringify(args.abi),
    };

    if (args.fnParams.length) {
      query.fnParams = (args.fnParams as string[])
        .map((arg, index) => `${index}=${arg}`)
        .join(',');
    }

    return queryString.stringifyUrl({ url: API_ENDPOINT, query });
  })
  .build();

import pkg from '../../package.json';
import { HardhatPluginError } from 'hardhat/plugins';
import type { NewTaskActionFunction } from 'hardhat/types/tasks';
import queryString from 'query-string';

const API_ENDPOINT = 'https://txn.xyz/v0/decode/';

interface ExportTxnDotXyzEncodeArguments {
  contractAddress: string;
  fn?: string;
  fnParams: string[];
  chainId: number;
}

const action: NewTaskActionFunction<ExportTxnDotXyzEncodeArguments> = async (
  args,
  hre,
) => {
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
      args.chainId ?? parseInt(await hre.network.provider.send('eth_chainId')),
    abi: JSON.stringify(args.abi),
  };

  if (args.fnParams.length) {
    query.fnParams = (args.fnParams as string[])
      .map((arg, index) => `${index}=${arg}`)
      .join(',');
  }

  return queryString.stringifyUrl({ url: API_ENDPOINT, query });
};

export default action;

import pkg from '../../package.json';
import type { TransactionOptions, TxnDotXyzV0Query } from '../types.js';
import { HardhatPluginError } from 'hardhat/plugins';
import type { HardhatRuntimeEnvironment } from 'hardhat/types/hre';
import readline from 'node:readline';
import open from 'open';
import queryString from 'query-string';

const API_ENDPOINT = 'https://txn.xyz/v0/decode/';

export const encode = async (
  hre: HardhatRuntimeEnvironment,
  args: TransactionOptions,
) => {
  const { provider } = await hre.network.connect();

  // note case change in variable name (chainId => chainID)
  const chainID = parseInt(
    args.chainId ??
      ((await provider.request({ method: 'eth_chainId' })) as string),
  );

  const { contractAddress } = args;

  const fn = args.fn;

  // TODO: infer ABI from `fn`
  // const abi = args.abi ? JSON.stringify(args.abi) : undefined;

  const fnParams =
    args.fnParams &&
    args.fnParams.map((arg, index) => `${index}=${arg}`).join(',');

  const query: TxnDotXyzV0Query = {
    chainID,
    contractAddress,
    fn,
    fnParams,
  };

  return queryString.stringifyUrl({ url: API_ENDPOINT, query });
};

export const send = async (
  url: string,
  options: { browser?: boolean; prompt?: boolean } = {},
) => {
  console.log(`Generated txn.xyz URL: ${url}`);

  if (options.browser) {
    try {
      await open(url);
      console.log(`Opened URL in browser.`);
    } catch (e) {
      throw new HardhatPluginError(
        pkg.name,
        'failed to open txn.xyz URL in browser',
      );
    }
  }

  if (options.prompt) {
    console.log(
      'Confirm pending transaction in browser.  Press enter to continue.',
    );

    try {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      await new Promise((resolve) => rl.question('> ', resolve));
      rl.close();
    } catch (e) {
      throw new HardhatPluginError(
        pkg.name,
        'failed to request user input; aborting',
      );
    }
  }
};

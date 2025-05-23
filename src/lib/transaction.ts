import pkg from '../../package.json';
import { HardhatPluginError } from 'hardhat/plugins';
import type { HardhatRuntimeEnvironment } from 'hardhat/types/hre';
import open from 'open';
import queryString from 'query-string';
import readline from 'readline';

const API_ENDPOINT = 'https://txn.xyz/v0/decode/';

export const encode = async (
  hre: HardhatRuntimeEnvironment,
  // TODO: type
  args: any,
) => {
  if (!Array.isArray(args.fnParams)) {
    throw new HardhatPluginError(pkg.name, 'fnParams must be array');
  }

  const { provider } = await hre.network.connect();

  // note case change in variable name (chainId => chainID)
  const chainID =
    args.chainId ??
    ((await provider.request({ method: 'eth_chainId' })) as string);

  const query: {
    contractAddress: string;
    fn: string;
    fnParams?: string;
    chainID: string;
    abi: string;
  } = {
    contractAddress: args.contractAddress,
    fn: args.fn,
    chainID,
    abi: JSON.stringify(args.abi),
  };

  if (args.fnParams.length) {
    query.fnParams = (args.fnParams as string[])
      .map((arg, index) => `${index}=${arg}`)
      .join(',');
  }

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

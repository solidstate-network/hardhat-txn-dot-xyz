import pkg from '../../package.json' with { type: 'json' };
import type { TransactionOptions, TxnDotXyzV1Query } from '../types.js';
import { Interface } from '@ethersproject/abi';
import { HardhatPluginError } from 'hardhat/plugins';
import type { HardhatRuntimeEnvironment } from 'hardhat/types/hre';
import readline from 'node:readline';
import open from 'open';
import queryString from 'query-string';

const API_ENDPOINT = 'https://txn.xyz/v1/decode';

export const encode = async (
  hre: HardhatRuntimeEnvironment,
  args: TransactionOptions,
) => {
  const { provider } = await hre.network.create();

  const chainId = parseInt(
    args.chainId ??
      ((await provider.request({ method: 'eth_chainId' })) as string),
  );

  const { to, fnSignature } = args;
  const fnParams = args.fnParams ?? [];

  // validate args locally before generating the URL
  const contractInterface = new Interface([`function ${fnSignature}`]);

  try {
    contractInterface.encodeFunctionData(fnSignature, fnParams);
  } catch (error) {
    throw new HardhatPluginError(
      pkg.name,
      `invalid parameters for function signature ${fnSignature}: ${fnParams.join(', ')}`,
    );
  }

  const query: TxnDotXyzV1Query = {
    chainId,
    to,
    fnSignature,
  };

  if (fnParams.length) {
    query.fnArgs = JSON.stringify(fnParams);
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

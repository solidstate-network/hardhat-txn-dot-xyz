import { name as packageName } from '../../package.json';
import { TASK_TXN_DOT_XYZ_SEND } from '../task_names';
import { task, types } from 'hardhat/config';
import { HardhatPluginError } from 'hardhat/plugins';
import open from 'open';
import readline from 'readline';

task(
  TASK_TXN_DOT_XYZ_SEND,
  'Generate txn.xyz URL for given transaction parameters and optionally open link in browser',
)
  .addOptionalParam('chainId', 'Target chain ID', undefined, types.int)
  .addParam('contractAddress', 'Target address', undefined, types.string)
  .addOptionalParam('fn', 'Target function name', undefined, types.string)
  .addOptionalParam(
    'fnParams',
    'Target function call arguments',
    [],
    types.json,
  )
  .addFlag('browser', 'Automatically open txn.xyz URL in browser')
  .addFlag(
    'prompt',
    'Require user confirmation of successful transaction before continuing execution',
  )
  .setAction(async (args, hre) => {
    const url = await hre.run('txn-dot-xyz-encode', args);

    console.log(`Generated txn.xyz URL: ${url}`);

    if (args.browser) {
      try {
        await open(url);
        console.log(`Opened URL in browser.`);
      } catch (e) {
        throw new HardhatPluginError(
          packageName,
          'failed to open txn.xyz URL in browser',
        );
      }
    }

    if (args.prompt) {
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
          packageName,
          'failed to request user input; aborting',
        );
      }
    }
  });

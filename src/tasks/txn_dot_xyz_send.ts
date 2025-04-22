import pkg from '../../package.json';
import { TASK_TXN_DOT_XYZ_SEND } from '../task_names.js';
import { task } from 'hardhat/config';
import { HardhatPluginError } from 'hardhat/plugins';
import { ArgumentType } from 'hardhat/types/arguments';
import open from 'open';
import readline from 'readline';

export default task(TASK_TXN_DOT_XYZ_SEND)
  .setDescription(
    'Generate txn.xyz URL for given transaction parameters and optionally open link in browser',
  )
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
  .addFlag({
    name: 'browser',
    description: 'Automatically open txn.xyz URL in browser',
  })
  // .addFlag({
  //   name: 'prompt',
  //   description:
  //     'Require user confirmation of successful transaction before continuing execution',
  // })
  .setAction(async (args, hre) => {
    const url = await hre.tasks.getTask('txn-dot-xyz-encode').run(args);

    console.log(`Generated txn.xyz URL: ${url}`);

    if (args.browser) {
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
          pkg.name,
          'failed to request user input; aborting',
        );
      }
    }
  })
  .build();

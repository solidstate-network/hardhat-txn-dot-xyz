import pkg from '../../package.json';
import { HardhatPluginError } from 'hardhat/plugins';
import type { NewTaskActionFunction } from 'hardhat/types/tasks';
import open from 'open';
import readline from 'readline';

interface ExportTxnDotXyzEncodeArguments {
  contractAddress: string;
  fn?: string;
  fnParams: string[];
  chainId: number;
  browser: boolean;
}

const action: NewTaskActionFunction<ExportTxnDotXyzEncodeArguments> = async (
  args,
  hre,
) => {
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
};

export default action;

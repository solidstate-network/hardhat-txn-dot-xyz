const { types } = require('hardhat/config');
const { HardhatPluginError } = require('hardhat/plugins');
const open = require('open');
const readline = require('readline');

const API_ENDPOINT = 'https://txn.xyz/v0/decode/';

task(
  'txn-dot-xyz-send', 'Generate txn.xyz URL for given transaction parameters and optionally open link in browser'
).addParam(
  'contractAddress', 'Target address', undefined, types.string
).addOptionalParam(
  'chainId', 'Target chain ID', undefined, types.int
).addOptionalParam(
  'fn', 'Target function name', undefined, types.string
).addOptionalParam(
  'fnParams', 'Target function call arguments', [], types.json
).addFlag(
  'noBrowser', 'Don\'t automatically open txn.xyz URL in browser'
).addFlag(
  'prompt', 'Require user confirmation of successful transaction before continuing execution'
).setAction(async function (args, hre) {
  const url = await hre.run('txn-dot-xyz-encode', args);

  console.log(`Generated txn.xyz URL: ${ url }`);

  if (!args.noBrowser) {
    try {
      await open(url);
      console.log(`Opened URL in browser.`);
    } catch (e) {
      throw new HardhatPluginError('failed to open txn.xyz URL in browser');
    }
  }

  if (args.prompt) {
    console.log('Confirm pending transaction in browser.  Press enter to continue.');

    try {
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      await new Promise((resolve) => rl.question('> ', resolve));
      rl.close();
    } catch (e) {
      throw new HardhatPluginError('failed to request user input; aborting');
    }
  }
});

const { types } = require('hardhat/config');
const { HardhatPluginError } = require('hardhat/plugins');
const open = require('open');
const readline = require('readline');

const API_ENDPOINT = 'https://txn.xyz/v0/decode/';

task(
  'txn-dot-xyz-send', 'TODO'
).addParam(
  'target', 'target address', undefined, types.string
).addOptionalParam(
  'chainId', 'target chain ID', undefined, types.int
).addOptionalParam(
  'fn', 'target function name', undefined, types.string
).addOptionalParam(
  'fnParams', 'target function call arguments', [], types.json
).addOptionalParam(
  'value', 'message value (denominated in wei)', 0, types.int
).addFlag(
  'open', 'Automatically open txn.xyz URL in browser'
).addFlag(
  'prompt', 'Require user confirmation of successful transaction before continuing execution'
).setAction(async function (args, hre) {
  const url = await hre.run('txn-dot-xyz-encode', args);

  console.log(`Generated txn.xyz URL: ${ url }`);

  if (args.open) {
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
      console.error('Prompt request failed. Continuing execution...', e);
    }
  }
});

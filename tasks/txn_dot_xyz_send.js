const { types } = require('hardhat/config');
const { HardhatPluginError } = require('hardhat/plugins');
const { stringifyUrl } = require('query-string');

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
).setAction(async function (args, hre) {
  const url = await hre.run('txn-dot-xyz-encode', args);

  // TODO: open url in browser
  // TODO: wait for user interaction
})

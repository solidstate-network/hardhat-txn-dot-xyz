const { types } = require('hardhat/config');
const { HardhatPluginError } = require('hardhat/plugins');
const { stringifyUrl } = require('query-string');

const API_ENDPOINT = 'https://txn.xyz/v0/decode/';

subtask(
  'txn-dot-xyz-encode'
).addParam(
  'target', 'Target address', undefined, types.string
).addOptionalParam(
  'chainId', 'Target chain ID', undefined, types.int
).addOptionalParam(
  'fn', 'Target function name', undefined, types.string
).addOptionalParam(
  'fnParams', 'Target function call arguments', [], types.json
).addOptionalParam(
  'value', 'Message value (denominated in wei)', 0, types.int
).setAction(async function (args, hre) {
  if (!Array.isArray(args.fnParams)) {
    throw new HardhatPluginError('fnParams must be array');
  }

  const query = {
    contractAddress: args.target,
    fn: args.fn,
  };

  // note case change in variable name (chainId => chainID)
  if (args.chainId) {
    query.chainID = args.chainId;
  } else {
    query.chainID = parseInt(await hre.network.provider.send('eth_chainId'));
  }

  if (args.fnParams.length) {
    query.fnParams = args.fnParams.map((arg, index) => `${ index }=${ arg }`).join(',');
  }

  if (args.value > 0) {
    query.value = args.value;
  }

  console.log('ARGS');
  console.log(args);
  console.log('QUERY');
  console.log(query);

  return stringifyUrl({ url: API_ENDPOINT, query });
});

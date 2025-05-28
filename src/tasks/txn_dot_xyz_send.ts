import { TASK_TXN_DOT_XYZ_SEND } from '../task_names.js';
import { task } from 'hardhat/config';
import { ArgumentType } from 'hardhat/types/arguments';

export default task(TASK_TXN_DOT_XYZ_SEND)
  .setDescription(
    'Generate txn.xyz URL for given transaction parameters and optionally open link in browser',
  )
  .addPositionalArgument({
    name: 'contractAddress',
    description: 'Target address',
  })
  .addPositionalArgument({
    name: 'fnSignature',
    description: 'Target function signature',
  })
  .addVariadicArgument({
    name: 'fnParams',
    description: 'Target function call arguments',
    defaultValue: [],
  })
  .addOption({
    name: 'chainId',
    description: 'Target chain ID (defaults to chain id of active network)',
    defaultValue: undefined,
    type: ArgumentType.STRING_WITHOUT_DEFAULT,
  })
  .addFlag({
    name: 'browser',
    description: 'Automatically open txn.xyz URL in browser',
  })
  .addFlag({
    name: 'prompt',
    description:
      'Require user confirmation of successful transaction before continuing execution',
  })
  .setAction(import.meta.resolve('../actions/txn_dot_xyz_send.js'))
  .build();

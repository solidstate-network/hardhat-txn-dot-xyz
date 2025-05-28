import { TASK_TXN_DOT_XYZ_ENCODE } from '../task_names.js';
import { task } from 'hardhat/config';
import { ArgumentType } from 'hardhat/types/arguments';

export default task(TASK_TXN_DOT_XYZ_ENCODE)
  .addPositionalArgument({
    name: 'to',
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
  .setAction(import.meta.resolve('../actions/txn_dot_xyz_encode.js'))
  .build();

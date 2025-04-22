import { TASK_TXN_DOT_XYZ_ENCODE } from '../task_names.js';
import { task } from 'hardhat/config';
import { ArgumentType } from 'hardhat/types/arguments';

export default task(TASK_TXN_DOT_XYZ_ENCODE)
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
  .setAction(import.meta.resolve('../actions/txn_dot_xyz_encode.js'))
  .build();

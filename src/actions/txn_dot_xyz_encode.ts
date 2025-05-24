import { encode } from '../lib/transaction.js';
import type { ExportTxnDotXyzEncodeArguments } from '../types.js';
import type { NewTaskActionFunction } from 'hardhat/types/tasks';

const action: NewTaskActionFunction<ExportTxnDotXyzEncodeArguments> = async (
  args,
  hre,
) => {
  let { chainId } = args;

  if (chainId) {
    chainId = `0x${BigInt(chainId).toString(16)}`;
  }

  const url = await encode(hre, { ...args, chainId });
  // TODO: print table with all parameters for easy verification
  console.log(url);

  return url;
};

export default action;

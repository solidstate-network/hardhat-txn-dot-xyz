import { encodeTransaction } from '../lib/txn_dot_xyz.js';
import type { NewTaskActionFunction } from 'hardhat/types/tasks';

interface ExportTxnDotXyzEncodeArguments {
  contractAddress: string;
  fn?: string;
  fnParams: string[];
  chainId: number;
}

const action: NewTaskActionFunction<ExportTxnDotXyzEncodeArguments> = async (
  args,
  hre,
) => {
  const url = await encodeTransaction(hre, args);
  // TODO: print table with all parameters for easy verification
  console.log(url);

  return url;
};

export default action;

import { encodeTransaction, sendTransaction } from '../lib/transaction.js';
import type { NewTaskActionFunction } from 'hardhat/types/tasks';

interface ExportTxnDotXyzEncodeArguments {
  contractAddress: string;
  fn?: string;
  fnParams: string[];
  chainId: number;
  browser: boolean;
  prompt: boolean;
}

const action: NewTaskActionFunction<ExportTxnDotXyzEncodeArguments> = async (
  args,
  hre,
) => {
  const url = await encodeTransaction(hre, args);
  await sendTransaction(url, { browser: args.browser, prompt: args.prompt });
};

export default action;

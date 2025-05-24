import { encode, send } from '../lib/transaction.js';
import type { ExportTxnDotXyzSendArguments } from '../types.js';
import type { NewTaskActionFunction } from 'hardhat/types/tasks';

const action: NewTaskActionFunction<ExportTxnDotXyzSendArguments> = async (
  args,
  hre,
) => {
  let { chainId } = args;

  if (chainId) {
    chainId = `0x${BigInt(chainId).toString(16)}`;
  }

  const url = await encode(hre, { ...args, chainId });
  await send(url, { browser: args.browser, prompt: args.prompt });
};

export default action;

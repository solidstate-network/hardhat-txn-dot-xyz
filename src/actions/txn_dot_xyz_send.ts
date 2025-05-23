import { encode, send } from '../lib/transaction.js';
import type { ExportTxnDotXyzSendArguments } from '../types.js';
import type { NewTaskActionFunction } from 'hardhat/types/tasks';

const action: NewTaskActionFunction<ExportTxnDotXyzSendArguments> = async (
  args,
  hre,
) => {
  const url = await encode(hre, args);
  await send(url, { browser: args.browser, prompt: args.prompt });
};

export default action;

export interface TransactionOptions {
  chainId?: string;
  to: string;
  fnSignature: string;
  fnParams?: string[];
}

export interface ExportTxnDotXyzSendArguments extends TransactionOptions {
  browser: boolean;
  prompt: boolean;
}

export type TxnDotXyzV0Query = {
  chainID: number;
  contractAddress: string;
  fn: string;
  fnParams?: string;
  abi?: string;
};

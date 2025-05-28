export interface ExportTxnDotXyzEncodeArguments {
  chainId?: string;
  to: string;
  fnSignature: string;
  fnParams?: string[];
}

export interface ExportTxnDotXyzSendArguments
  extends ExportTxnDotXyzEncodeArguments {
  browser: boolean;
  prompt: boolean;
}

export type TransactionOptions = ExportTxnDotXyzEncodeArguments;

export type TxnDotXyzV0Query = {
  chainID: number;
  contractAddress: string;
  fn: string;
  fnParams?: string;
  abi?: string;
};

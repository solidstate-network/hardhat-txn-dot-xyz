export interface ExportTxnDotXyzEncodeArguments {
  chainId?: string;
  contractAddress: string;
  fn: string;
  fnParams?: string[];
}

export interface ExportTxnDotXyzSendArguments
  extends ExportTxnDotXyzEncodeArguments {
  browser: boolean;
  prompt: boolean;
}

// TODO: type should match standard tx encoding options from ethers/viem
export type TransactionOptions = ExportTxnDotXyzEncodeArguments;

export type TxnDotXyzV0Query = {
  chainID: number;
  contractAddress: string;
  fn: string;
  fnParams?: string;
  abi?: string;
};

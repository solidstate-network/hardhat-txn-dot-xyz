export interface ExportTxnDotXyzEncodeArguments {
  contractAddress: string;
  fn?: string;
  fnParams: string[];
  chainId?: string;
}

export interface ExportTxnDotXyzSendArguments
  extends ExportTxnDotXyzEncodeArguments {
  browser: boolean;
  prompt: boolean;
}

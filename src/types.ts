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

export type TxnDotXyzV1Query = {
  chainId: number;
  to: string;
  fnSignature: string;
  fnArgs?: string;
};

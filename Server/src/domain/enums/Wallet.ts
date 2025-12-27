export enum WalletTransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

export enum TransactionReferenceType {
  RIDE = 'RIDE',
  PAYMENT = 'PAYMENT',
  REFUND = 'REFUND',
  PAYOUT = 'PAYOUT',
}

export enum WalletTransactionStatus {
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

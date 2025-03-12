export class TransactionAlreadyRevertedError extends Error {
  statusCode: number
  constructor() {
    super('transaction was already reverted');
    this.name = 'TransactionAlreadyRevertedError';
    this.statusCode = 409
  }
}

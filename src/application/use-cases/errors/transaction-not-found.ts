export class TransactionNotFoundError extends Error {
  statusCode: number
  constructor() {
    super('transaction not found');
    this.name = 'TransactionNotFoundError';
    this.statusCode = 409
  }
}

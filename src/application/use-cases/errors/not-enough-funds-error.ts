export class NotEnoughFundsError extends Error {
  statusCode: number
  constructor() {
    super('Sender with insufficient funds to complete the transaction.');
    this.name = 'NotEnoughFundsError';
    this.statusCode = 409
  }
}

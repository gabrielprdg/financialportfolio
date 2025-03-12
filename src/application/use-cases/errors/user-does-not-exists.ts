export class UserDoesNotExists extends Error {
  statusCode: number
  constructor() {
    super('User does not exists');
    this.name = 'UserDoesNotExists';
    this.statusCode = 409
  }
}

export class UserAlreadyExists extends Error {
  statusCode: number
  constructor() {
    super('User with this email already exists');
    this.name = 'UserAlreadyExists';
    this.statusCode = 409
  }
}

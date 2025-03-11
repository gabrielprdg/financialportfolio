import { User } from "./user";

describe('User', () => {
  it('Should create a user', () => {
    const user = new User({
      name: 'string',
      email: 'string',
      password: 'string'
    });

    expect(user).toBeTruthy();
  });
});

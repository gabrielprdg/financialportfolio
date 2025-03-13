
import { InMemoryUserRepository } from "@test/repositories/in-memory-user-repository";
import * as bcrypt from 'bcrypt';
import { UserAlreadyExists } from "../errors/user-already-exists";
import { RegisterUser } from "./register-user";

const makeUserParams = () => ({
  name: 'Gabriel', email: 'gabriel.rodrigues@example.com', password: 'password', balance: 99
})

jest.mock('bcrypt');
describe("RegisterUser", () => {

  it("should register a new user when email is not taken", async () => {
    const userRepository = new InMemoryUserRepository();
    const registerUser = new RegisterUser(userRepository, bcrypt)

    jest.spyOn(bcrypt, 'hash').mockResolvedValue(`hashed-${makeUserParams().password}`);

    const { user } = await registerUser.execute(makeUserParams());
    expect(userRepository.users).toHaveLength(1);
    expect(userRepository.users[0]).toEqual(user);
    expect(userRepository.users[0]).toHaveProperty("props.password", "hashed-password");
  });

  it("should throw an error if email is already in use", async () => {
    const userRepository = new InMemoryUserRepository();
    const registerUser = new RegisterUser(userRepository, bcrypt)

    const userData = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "plain-password",
      balance: 100
    };

    jest.spyOn(bcrypt, 'hash').mockResolvedValue(`hashed-${userData.password}`);

    await registerUser.execute(userData);
    await expect(registerUser.execute(userData)).rejects.toThrow(UserAlreadyExists);
  });
});
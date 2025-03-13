import { User } from '@application/entities/user';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { LoadUsers } from './load-users';

const makeUserParams = () => ({
  name: 'Gabriel', email: 'gabriel.rodrigues@example.com', password: '123456', balance: 99
})

describe('LoadUsers', () => {
  let userRepository: InMemoryUserRepository;
  let loadUsers: LoadUsers;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    loadUsers = new LoadUsers(userRepository);
  });

  it('should return an empty array if there are no users', async () => {
    const users = await loadUsers.execute();
    expect(users).toEqual([]);
  });

  it('should return a list of users', async () => {
    const user1 = new User(makeUserParams());
    const user2 = new User(makeUserParams());
    await userRepository.create(user1);
    await userRepository.create(user2);

    const users = await loadUsers.execute();
    expect(users).toHaveLength(2);
    expect(users).toContainEqual(user1);
    expect(users).toContainEqual(user2);
  });
});
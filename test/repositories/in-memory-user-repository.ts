import { User } from "@application/entities/user";
import { UserRepository } from "@application/protocols/db/user-repository";

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];


  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.filter(
      (user) => user.email === email,
    );

    if (!user) {
      return null;
    }
    return user[0];
  }

  async findById(userId: string): Promise<User | null> {
    const user = this.users.filter(
      (user) => user.id === userId,
    );

    if (!user) {
      return null;
    }
    return user[0];
  }

  async save(user: User): Promise<void> {
    const index = this.users.findIndex((existingUser) => existingUser.id === user.id);

    if (index !== -1) {
      this.users[index] = user;
    } else {
      this.users.push(user);
    }
  }

  async loadUsers(): Promise<User[]> {
    return this.users
  }

}

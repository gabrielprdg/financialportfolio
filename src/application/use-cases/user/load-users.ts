import { User } from '@application/entities/user';
import { UserRepository } from '@application/protocols/db/user-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoadUsers {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async execute(): Promise<User[]> {
    const users = await this.userRepository.loadUsers()
    return users
  }
}
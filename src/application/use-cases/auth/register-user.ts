import { User } from "@application/entities/user"
import { Injectable } from "@nestjs/common"
import { UserAlreadyExists } from "../errors/user-already-exists"
import { UserRepository } from "@application/protocols/db/user-repository"
import { HashService } from "@infra/services/hash.service"


interface RegisterUserDataRequest {
  name: string
  email: string
  password: string
  balance: number
}

type RegisterUserResponse = {
  user: User
}

@Injectable()
export class RegisterUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
  ) { }

  async execute(userData: RegisterUserDataRequest): Promise<RegisterUserResponse> {
    const { name, email, password, balance } = userData

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new UserAlreadyExists();
    }
    const hashedPassword = await this.hashService.hash(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      balance
    })

    await this.userRepository.create(user);

    return { user };
  }
}
import { User } from '@application/entities/user'
import { User as RawUser } from '@prisma/client'


export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      balance: user.balance,
      createdAt: user.createdAt
    }
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        balance: raw.balance.toNumber(),
        createdAt: raw.createdAt
      },
      raw.id
    )
  }
}
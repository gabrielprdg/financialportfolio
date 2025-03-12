import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";
import { UserRepository } from "@application/protocols/db/user-repository";
import { User } from "@application/entities/user";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) { }

  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);

    await this.prismaService.user.create({
      data: raw,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findById(id: string): Promise<User | null> {
    const task = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      return null;
    }

    return PrismaUserMapper.toDomain(task);
  }

  async save(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);

    await this.prismaService.user.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }
}

import { Transaction } from "@application/entities/transaction";
import { TransactionRepository } from "@application/protocols/db/transaction-repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { PrismaTransactionMapper } from "../mappers/prisma-transaction-mapper";

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  constructor(private prismaService: PrismaService) { }

  async create(transaction: Transaction): Promise<void> {
    const raw = PrismaTransactionMapper.toPrisma(transaction);

    await this.prismaService.transaction.create({ data: raw, });
  }

  async findById(id: string): Promise<Transaction | null> {
    const task = await this.prismaService.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      return null;
    }

    return PrismaTransactionMapper.toDomain(task);
  }


  async loadTransactions(): Promise<Transaction[]> {
    const tasks = await this.prismaService.transaction.findMany();

    return PrismaTransactionMapper.toArrayDomain(tasks);
  }


  async save(transaction: Transaction): Promise<void> {
    const raw = PrismaTransactionMapper.toPrisma(transaction);

    await this.prismaService.transaction.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

}

import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { UserRepository } from "@application/protocols/db/user-repository";
import { PrismaUserRepository } from "./prisma/repositories/prisma-user-repository";
import { TransactionRepository } from "@application/protocols/db/transaction-repository";
import { PrismaTransactionRepository } from "./prisma/repositories/prisma-transaction-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: TransactionRepository,
      useClass: PrismaTransactionRepository,
    }
  ],
  exports: [UserRepository, TransactionRepository],
})
export class DatabaseModule { }

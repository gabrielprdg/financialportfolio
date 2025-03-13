import { Transaction } from '@application/entities/transaction';
import { TransactionRepository } from '@application/protocols/db/transaction-repository';
import { UserRepository } from '@application/protocols/db/user-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoadTransactions {
  constructor(
    private readonly transactionRepository: TransactionRepository,
  ) { }

  async execute(): Promise<Transaction[]> {
    const transactions = await this.transactionRepository.loadTransactions()
    return transactions
  }
}
import { Transaction } from "@application/entities/transaction";
import { TransactionRepository } from "@application/protocols/db/transaction-repository";

export class InMemoryTransactionRepository implements TransactionRepository {
  public transactions: Transaction[] = [];


  async create(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }

  async findById(transactionId: string): Promise<Transaction | null> {
    const transaction = this.transactions.filter(
      (transaction) => transaction.id === transactionId,
    );

    if (!transaction) {
      return null;
    }
    return transaction[0];
  }

  async loadTransactions(): Promise<Transaction[]> {
    return this.transactions
  }

}

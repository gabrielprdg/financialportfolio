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

  async save(transaction: Transaction): Promise<void> {
    const index = this.transactions.findIndex((existingTransaction) => existingTransaction.id === transaction.id);

    if (index !== -1) {
      this.transactions[index] = transaction;
    } else {
      this.transactions.push(transaction);
    }
  }


}

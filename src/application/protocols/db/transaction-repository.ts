import { Transaction } from "@application/entities/transaction";

export abstract class TransactionRepository {
  abstract create(transaction: Transaction): Promise<string>;
  abstract findById(id: string): Promise<Transaction | null>;
  abstract loadTransactions(): Promise<Transaction[]>;
  abstract save(user: Transaction): Promise<void>;
}
import { Transaction } from "@application/entities/transaction";
export class TransactionViewModel {
  static toHTTP(transaction: Transaction) {
    return {
      id: transaction.id,
      senderId: transaction.senderId,
      receiverId: transaction.receiverId,
      status: transaction.status,
      amount: transaction.amount,
      createdAt: transaction.createdAt
    };
  }
}

import { Transaction } from '@application/entities/transaction'
import { Transaction as RawTransaction } from '@prisma/client'

export class PrismaTransactionMapper {
  static toPrisma(transaction: Transaction) {
    return {
      id: transaction.id,
      senderId: transaction.senderId,
      receiverId: transaction.receiverId,
      amount: transaction.amount,
      status: transaction.status,
      createdAt: transaction.createdAt
    }
  }

  static toDomain(raw: RawTransaction): Transaction {
    return new Transaction(
      {
        senderId: raw.senderId,
        receiverId: raw.receiverId,
        amount: raw.amount.toNumber()
      },
      raw.id
    )
  }

  static toArrayDomain(raw: RawTransaction[]): Transaction[] {
    const transactions = raw.map(
      (transaction) =>
        new Transaction(
          {
            senderId: transaction.senderId,
            receiverId: transaction.receiverId,
            amount: transaction.amount.toNumber(),
            status: transaction.status,
            createdAt: transaction.createdAt
          },
          transaction.id,
        ),
    );

    return transactions;
  }
}
import { TransactionRepository } from '@application/protocols/db/transaction-repository';
import { UserRepository } from '@application/protocols/db/user-repository';
import { Injectable } from '@nestjs/common';
import { TransactionAlreadyRevertedError } from '../errors/transaction-already-reverted';
import { TransactionNotFoundError } from '../errors/transaction-not-found';


interface RevertTransactionDataRequest {
  id: string
}
@Injectable()
export class RevertTransaction {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly userRepository: UserRepository
  ) { }

  async execute(transactionData: RevertTransactionDataRequest) {
    const { id } = transactionData

    const transaction = await this.transactionRepository.findById(id)

    if (!transaction) {
      throw new TransactionNotFoundError()
    }

    const { senderId, receiverId } = transaction

    const users = await Promise.all(
      [senderId, receiverId].map(id => this.userRepository.findById(id))
    );

    const [sender, receiver] = users
    sender?.increase(transaction.amount)
    receiver?.decrease(transaction.amount)


    if (transaction.status === 'reverted') {
      throw new TransactionAlreadyRevertedError()
    }

    await Promise.all([sender, receiver].map(user => user ? this.userRepository.save(user) : Promise.resolve()))

    transaction.status = 'reverted'
    await this.transactionRepository.save(transaction)
  }
}
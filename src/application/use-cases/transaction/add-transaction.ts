import { Transaction } from '@application/entities/transaction';
import { TransactionRepository } from '@application/protocols/db/transaction-repository';
import { UserRepository } from '@application/protocols/db/user-repository';
import { Injectable } from '@nestjs/common';
import { UserDoesNotExists } from '../errors/user-does-not-exists';


interface TransactionDataRequest {
  senderId: string
  receiverId: string
  amount: number
}
@Injectable()
export class AddTransaction {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly userRepository: UserRepository
  ) { }

  async execute(transactionData: TransactionDataRequest) {
    const { senderId, receiverId, amount } = transactionData

    const users = await Promise.all(
      [senderId, receiverId].map(id => this.userRepository.findById(id))
    );

    console.log('users', users)

    if (users.some(user => user === null || user === undefined)) {
      throw new UserDoesNotExists();
    }

    const transaction = new Transaction({
      senderId,
      receiverId,
      amount
    })

    await this.transactionRepository.create(transaction);
  }
}
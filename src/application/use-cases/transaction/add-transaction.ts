import { Transaction } from '@application/entities/transaction';
import { TransactionRepository } from '@application/protocols/db/transaction-repository';
import { UserRepository } from '@application/protocols/db/user-repository';
import { Injectable } from '@nestjs/common';
import { UserDoesNotExists } from '../errors/user-does-not-exists';
import { NotEnoughFundsError } from '../errors/not-enough-funds-error';


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

    if (users.some(user => user === null || user === undefined)) {
      throw new UserDoesNotExists();
    }

    const [sender, receiver] = users;

    if (receiver && sender?.balance !== undefined && sender.balance < amount) {
      throw new NotEnoughFundsError()
    }

    sender?.decrease(amount)
    receiver?.increase(amount)


    const transaction = new Transaction({
      senderId,
      receiverId,
      amount
    })

    await Promise.all([sender, receiver].map(user => user ? this.userRepository.save(user) : Promise.resolve()))

    await this.transactionRepository.create(transaction);
  }
}
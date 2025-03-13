
import { User } from '@application/entities/user';
import { Transaction } from '@application/entities/transaction';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { AddTransaction } from './add-transaction';
import { UserDoesNotExists } from '../errors/user-does-not-exists';
import { InMemoryTransactionRepository } from '@test/repositories/in-memory-transaction-repository';
import { NotEnoughFundsError } from '../errors/not-enough-funds-error';


describe('AddTransaction', () => {
  let userRepository: InMemoryUserRepository;
  let transactionRepository: InMemoryTransactionRepository;
  let addTransaction: AddTransaction;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    transactionRepository = new InMemoryTransactionRepository();
    addTransaction = new AddTransaction(transactionRepository, userRepository);
  });

  it('should create a transaction when sender and receiver exist', async () => {
    const sender = new User({ name: 'Gabriel', email: 'sender@example.com', password: '123456', balance: 100 });
    const receiver = new User({ name: 'Gabriel', email: 'receiver@example.com', password: 'abcdef', balance: 100 });

    await userRepository.create(sender);
    await userRepository.create(receiver);

    await addTransaction.execute({ senderId: sender.id, receiverId: receiver.id, amount: 100 });

    expect(transactionRepository.transactions).toHaveLength(1);
    expect(transactionRepository.transactions[0]).toBeInstanceOf(Transaction);
  });

  it('should throw UserDoesNotExists if sender does not exist', async () => {
    const receiver = new User({ name: 'Gabriel', email: 'receiver@example.com', password: 'abcdef' });
    await userRepository.create(receiver);

    await expect(
      addTransaction.execute({ senderId: '13', receiverId: '24', amount: 100 })
    ).rejects.toThrow(UserDoesNotExists);
  });

  it('should throw UserDoesNotExists if receiver does not exist', async () => {
    const sender = new User({ name: 'Gabriel', email: 'sender@example.com', password: '123456' });
    await userRepository.create(sender);

    await expect(
      addTransaction.execute({ senderId: '12', receiverId: '22', amount: 100 })
    ).rejects.toThrow(UserDoesNotExists);
  });

  it('should return NotEnoughFundsError if sender doesnt have sufficient funds', async () => {
    const sender = new User({ name: 'Gabriel', email: 'sender@example.com', password: '123456', balance: 99 });
    const receiver = new User({ name: 'Gabriel', email: 'receiver@example.com', password: 'abcdef', balance: 100 });

    await userRepository.create(sender);
    await userRepository.create(receiver);

    await expect(
      addTransaction.execute({ senderId: sender.id, receiverId: receiver.id, amount: 100 })
    ).rejects.toThrow(NotEnoughFundsError);
  })
});

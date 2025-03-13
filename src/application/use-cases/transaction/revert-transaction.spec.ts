import { User } from '@application/entities/user';
import { Transaction } from '@application/entities/transaction';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { InMemoryTransactionRepository } from '@test/repositories/in-memory-transaction-repository';
import { RevertTransaction } from './revert-transaction';
import { TransactionAlreadyRevertedError } from '../errors/transaction-already-reverted';
import { TransactionNotFoundError } from '../errors/transaction-not-found';


describe('RevertTransaction', () => {
  let userRepository: InMemoryUserRepository;
  let transactionRepository: InMemoryTransactionRepository;
  let revertTransaction: RevertTransaction;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    transactionRepository = new InMemoryTransactionRepository();
    revertTransaction = new RevertTransaction(transactionRepository, userRepository);
  });

  it('should revert a transaction successfully', async () => {
    const sender = new User({ name: 'Sender', email: 'sender@example.com', password: '123456', balance: 100 });
    const receiver = new User({ name: 'Receiver', email: 'receiver@example.com', password: 'abcdef', balance: 50 });
    await userRepository.create(sender);
    await userRepository.create(receiver);

    const transaction = new Transaction({ senderId: sender.id, receiverId: receiver.id, amount: 30, status: 'completed' });
    await transactionRepository.create(transaction);

    await revertTransaction.execute({ id: transaction.id });

    expect(transaction.status).toBe('reverted');
    expect(sender.balance).toBe(130);
    expect(receiver.balance).toBe(20);
  });

  it('should throw an error if the transaction does not exist', async () => {
    await expect(
      revertTransaction.execute({ id: 'non-existent-transaction' })
    ).rejects.toThrow(TransactionNotFoundError);
  });

  it('should throw TransactionAlreadyRevertedError if the transaction is already reverted', async () => {
    const sender = new User({ name: 'Sender', email: 'sender@example.com', password: '123456', balance: 100 });
    const receiver = new User({ name: 'Receiver', email: 'receiver@example.com', password: 'abcdef', balance: 50 });
    await userRepository.create(sender);
    await userRepository.create(receiver);

    const transaction = new Transaction({ senderId: sender.id, receiverId: receiver.id, amount: 30, status: 'reverted' });
    await transactionRepository.create(transaction);

    await expect(
      revertTransaction.execute({ id: transaction.id })
    ).rejects.toThrow(TransactionAlreadyRevertedError);
  });
});

import { Transaction } from '@application/entities/transaction';
import { InMemoryTransactionRepository } from '@test/repositories/in-memory-transaction-repository';
import { LoadTransactions } from './load-transactions';

describe('LoadTransactions', () => {
  let transactionRepository: InMemoryTransactionRepository;
  let loadTransactions: LoadTransactions;

  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository();
    loadTransactions = new LoadTransactions(transactionRepository);
  });

  it('should return an empty array if there are no transactions', async () => {
    const transactions = await loadTransactions.execute();
    expect(transactions).toEqual([]);
  });

  it('should return a list of transactions', async () => {
    const transaction1 = new Transaction({ senderId: '1', receiverId: '2', amount: 50, status: 'success' });
    const transaction2 = new Transaction({ senderId: '3', receiverId: '4', amount: 100, status: 'success' });
    await transactionRepository.create(transaction1);
    await transactionRepository.create(transaction2);

    const transactions = await loadTransactions.execute();
    expect(transactions).toHaveLength(2);
    expect(transactions).toContainEqual(transaction1);
    expect(transactions).toContainEqual(transaction2);
  });
});
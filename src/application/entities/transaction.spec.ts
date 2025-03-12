import { Transaction } from "./transaction";


describe('Transaction', () => {
  it('Should make a transaction', () => {
    const transaction = new Transaction({
      senderId: 'id1',
      receiverId: 'id2',
      amount: 2,
      status: 'sucess'
    });

    expect(transaction).toBeTruthy();
  });
});

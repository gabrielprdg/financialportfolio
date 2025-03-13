import { AddTransaction } from "@application/use-cases/transaction/add-transaction";
import { LoadTransactions } from "@application/use-cases/transaction/load-transactions";
import { RevertTransaction } from "@application/use-cases/transaction/revert-transaction";
import { AddTransactionBody } from "@infra/http/dtos/add-transaction-body";
import { TransactionViewModel } from "@infra/http/view-model/transaction-view-model";
import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common";


@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly addTransaction: AddTransaction,
    private readonly revertTransaction: RevertTransaction,
    private readonly loadTransactions: LoadTransactions
  ) { }

  @Post()
  @HttpCode(204)
  async create(@Body() body: AddTransactionBody) {
    const { senderId, receiverId, amount } = body;

    await this.addTransaction.execute({
      senderId, receiverId, amount
    });
  }

  @Post(':id/revert')
  async revert(@Param('id') id: string) {
    await this.revertTransaction.execute({ id })
  }

  @Get()
  async loadAll() {
    const transactions = await this.loadTransactions.execute()
    return transactions.map(TransactionViewModel.toHTTP);
  }
}
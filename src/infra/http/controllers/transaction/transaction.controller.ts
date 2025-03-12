import { AddTransaction } from "@application/use-cases/transaction/add-transaction";
import { RevertTransaction } from "@application/use-cases/transaction/revert-transaction";
import { AddTransactionBody } from "@infra/http/dtos/add-transaction-body";
import { Body, Controller, HttpCode, Param, Post } from "@nestjs/common";


@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly addTransaction: AddTransaction,
    private readonly revertTransaction: RevertTransaction
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
  @HttpCode(204)
  async revert(@Param('id') id: string) {
    await this.revertTransaction.execute({ id })
  }

}
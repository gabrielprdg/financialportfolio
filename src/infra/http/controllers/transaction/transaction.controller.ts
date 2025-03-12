import { AddTransaction } from "@application/use-cases/transaction/add-transaction";
import { AddTransactionBody } from "@infra/http/dtos/add-transaction-body";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";


@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly addTransaction: AddTransaction,
  ) { }

  @Post()
  @HttpCode(204)
  async create(@Body() body: AddTransactionBody) {
    const { senderId, receiverId, amount } = body;

    await this.addTransaction.execute({
      senderId, receiverId, amount
    });
  }
}
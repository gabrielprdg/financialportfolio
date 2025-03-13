import { AddTransaction } from "@application/use-cases/transaction/add-transaction";
import { LoadTransactions } from "@application/use-cases/transaction/load-transactions";
import { RevertTransaction } from "@application/use-cases/transaction/revert-transaction";
import { AddTransactionBody } from "@infra/http/dtos/add-transaction-body";
import { TransactionViewModel } from "@infra/http/view-model/transaction-view-model";
import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('transactions')
@ApiBearerAuth()
@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly addTransaction: AddTransaction,
    private readonly revertTransaction: RevertTransaction,
    private readonly loadTransactions: LoadTransactions
  ) { }

  @Post()
  @ApiOperation({ summary: 'Create transaction' })
  @ApiResponse({ status: 204, description: 'Create transaction' })
  @ApiResponse({ status: 409, description: 'User does not exists' })
  async create(@Body() body: AddTransactionBody) {
    const { senderId, receiverId, amount } = body;

    const { id } = await this.addTransaction.execute({
      senderId, receiverId, amount
    });

    return { id, message: "Transaction completed successfully" }
  }

  @Post(':id/revert')
  @ApiOperation({ summary: 'revert a certain transactions' })
  @ApiResponse({ status: 200, description: 'Transaction created' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  @ApiResponse({ status: 409, description: 'Transaction already reverted' })
  async revert(@Param('id') id: string) {
    await this.revertTransaction.execute({ id })
  }

  @Get()
  @ApiOperation({ summary: 'List all transactions' })
  @ApiResponse({ status: 200, description: 'List all the transactions' })
  async loadAll() {
    const transactions = await this.loadTransactions.execute()
    return transactions.map(TransactionViewModel.toHTTP);
  }
}
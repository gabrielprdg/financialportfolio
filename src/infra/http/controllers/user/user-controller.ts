import { AddTransaction } from "@application/use-cases/transaction/add-transaction";
import { LoadTransactions } from "@application/use-cases/transaction/load-transactions";
import { RevertTransaction } from "@application/use-cases/transaction/revert-transaction";
import { LoadUsers } from "@application/use-cases/user/load-users";
import { AddTransactionBody } from "@infra/http/dtos/add-transaction-body";
import { TransactionViewModel } from "@infra/http/view-model/transaction-view-model";
import { UserViewModel } from "@infra/http/view-model/user-view-model";
import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private readonly loadUsers: LoadUsers,
  ) { }

  @Get()
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({ status: 200, description: 'List all the users' })
  async loadAll() {
    const users = await this.loadUsers.execute()
    return users.map(UserViewModel.toHTTP);
  }
}
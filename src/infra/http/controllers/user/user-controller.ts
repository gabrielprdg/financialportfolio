import { LoadUsers } from "@application/use-cases/user/load-users";
import { UserViewModel } from "@infra/http/view-model/user-view-model";
import { Controller, Get, Logger } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly loadUsers: LoadUsers,
  ) { }

  @Get()
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({ status: 200, description: 'List all the users' })
  async loadAll() {
    this.logger.log('[POST] /user');

    const users = await this.loadUsers.execute()
    return users.map(UserViewModel.toHTTP);
  }
}
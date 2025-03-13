import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { AuthController } from "./http/controllers/auth/auth.controller";
import { RegisterUser } from "@application/use-cases/auth/register-user";
import { LoginUser } from "@application/use-cases/auth/login-user";
import { HashService } from "./services/hash.service";
import { AuthService } from "./services/auth.service";
import { AddTransaction } from "@application/use-cases/transaction/add-transaction";
import { TransactionController } from "./http/controllers/transaction/transaction.controller";
import { RevertTransaction } from "@application/use-cases/transaction/revert-transaction";
import { LoadTransactions } from "@application/use-cases/transaction/load-transactions";

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController, TransactionController],
  providers: [
    RegisterUser,
    LoginUser,
    RevertTransaction,
    LoadTransactions,
    HashService,
    AuthService,
    AddTransaction
  ],
})
export class HttpModule { }

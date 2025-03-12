import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { AuthController } from "./http/controllers/auth/auth.controller";
import { RegisterUser } from "@application/use-cases/auth/register-user";
import { LoginUser } from "@application/use-cases/auth/login-user";
import { HashService } from "./services/hash.service";
import { AuthService } from "./services/auth.service";

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    RegisterUser,
    LoginUser,
    HashService,
    AuthService
  ],
})
export class HttpModule { }

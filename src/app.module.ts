import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http.module';
import { TransactionController } from '@infra/http/controllers/transaction/transaction.controller';
import { AuthMiddleware } from '@infra/middlewares/auth-middleware';
import { AuthService } from '@infra/services/auth.service';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
@Module({
  providers: [AuthService],
  imports: [HttpModule, DatabaseModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'auth/login', method: RequestMethod.POST })
      .forRoutes(TransactionController);
  }
}

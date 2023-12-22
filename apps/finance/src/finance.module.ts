import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';
import httpConfig from '../../../configs/http.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [httpConfig],
    }),
  ],
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {}

import { Module } from '@nestjs/common';
import { MarketingController } from './marketing.controller';
import { MarketingService } from './marketing.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import httpConfig from '../../../configs/http.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [httpConfig],
    }),
  ],
  controllers: [MarketingController],
  providers: [MarketingService],
})
export class MarketingModule {}

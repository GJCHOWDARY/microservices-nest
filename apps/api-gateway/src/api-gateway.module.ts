import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import httpConfig from '../../../configs/http.config';
import sentryConfig from '../../../configs/sentry.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [httpConfig, sentryConfig],
    }),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}

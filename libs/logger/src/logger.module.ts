import { Module, Logger } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ConfigModule } from '@nestjs/config';
import sentryConfig from '../../../configs/sentry.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        sentryConfig,
      ],
    }),
  ],
  providers: [
    LoggerService,
    Logger,
  ],
  exports: [
    LoggerService,
    Logger,
  ],
})
export class LoggerModule {}

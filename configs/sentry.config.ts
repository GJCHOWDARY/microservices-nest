import { registerAs } from '@nestjs/config';

export default registerAs('sentry', () => ({
  apps: {
    apiGateway: {
      dsn: (
        process.env.SENTRY_URL || 'sentry url'
      ).trim(),
      debug: true,
      logLevel: 'Error',
    },
  },
}));

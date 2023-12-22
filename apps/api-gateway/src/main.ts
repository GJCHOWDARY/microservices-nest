import { AppFactory, AppModuleProxy } from '@app/factories';
import * as Sentry from '@sentry/node';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app: AppModuleProxy = await AppFactory.create('apiGateway', ApiGatewayModule);
  await app.listen(app.config.get('http.apps.apiGateway'));
}

bootstrap()
  .catch(err => {
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(err);
    }
    process.exitCode = -1;
    process.exit();
  });
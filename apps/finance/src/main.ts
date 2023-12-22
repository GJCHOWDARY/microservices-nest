import { FinanceModule } from './finance.module';
import { AppFactory, AppModuleProxy } from '@app/factories';

async function bootstrap() {
  const app: AppModuleProxy = await AppFactory.create('finance', FinanceModule);

  app.enableShutdownHooks();
  await app.listen(app.config.get('http.apps.finance'));
}

bootstrap();
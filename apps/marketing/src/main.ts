import { MarketingModule } from './marketing.module';
import { AppFactory, AppModuleProxy } from '@app/factories';

async function bootstrap() {
  const app: AppModuleProxy = await AppFactory.create('marketing', MarketingModule);

  app.enableShutdownHooks();
  await app.listen(app.config.get('http.apps.marketing'));
}

bootstrap();
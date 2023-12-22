import { UsersModule } from './users.module';
import { AppFactory, AppModuleProxy } from '@app/factories';

async function bootstrap() {
  const app: AppModuleProxy = await AppFactory.create('users', UsersModule);

  app.enableShutdownHooks();
  await app.listen(app.config.get('http.apps.users'));
}

bootstrap();
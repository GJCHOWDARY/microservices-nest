import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { INestMicroservice, ValidationPipe, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import cookieParser = require('cookie-parser');
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

const logger = new Logger('AppFactory');
export class AppModuleProxy {
  #instance: NestExpressApplication;
  #config: ConfigService;

  /**
   * @param {NestExpressApplication} moduleInstance
   * @param {ConfigService} configService
   */
  constructor(moduleInstance: NestExpressApplication, configService: ConfigService) {
    this.#instance = moduleInstance;
    this.#config = configService;
  }

  async listen(port: string | number): Promise<any> {
    return this.#instance.listen(port);
  }

  async listenAsync(port: string | number, hostname?: string): Promise<any> {
    return this.#instance.listen(port, hostname);
  }

  async useLogger(logger: LoggerService): Promise<void> {
    return this.#instance.useLogger(logger);
  }

  get(token) {
    return this.#instance.get(token);
  }

  enableShutdownHooks() {
    this.#instance.enableShutdownHooks();
  }

  get instance(): NestExpressApplication {
    return this.#instance;
  }

  get config(): ConfigService {
    return this.#config;
  }
}

export class AppFactory {
  /**
   * Creates app instance from
   * class AppModule (class decorated with @Module) provided as appModule
   * and returns instance of AppModuleInstanceProxy class
   * that proxies necessary accessors
   *
   * @param {string} appName App module name camel cased. Example: api-gateway => apiGateway
   * @param {Module} appModule
   *
   * @param hasRawBodyParser
   * @returns AppModuleProxy
   */
  static async create(appName: string, appModule, hasRawBodyParser?: boolean): Promise<AppModuleProxy> {
    logger.log(new Date().toJSON());
    const app = await NestFactory.create<NestExpressApplication>(appModule, {
      logger: WinstonModule.createLogger({
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp({ format: () => {return new Date().toJSON();} }),
              nestWinstonModuleUtilities.format.nestLike(),
            ),
          }),
        ],
      }),
    });
    const config = app.get(ConfigService);


    app.enableCors({
      credentials: true,
    });
    app.use(cookieParser());
    app.set('trust proxy', 1);

    if (process.env.NODE_ENV !== 'test') {
      app.use((req: Request, res: Response, next: Function) => {
        const { ip, method, originalUrl: url } = req;
        const userAgent = req.get('user-agent') || '';

        const startAt = process.hrtime();

        res.on('close', () => {
          const diff = process.hrtime(startAt);
          const time = diff[0] * 1e3 + diff[1] * 1e-6;

          const { statusCode } = res;

          logger.log(`${new Date().toISOString()} | ${time} | ${ip} | ${method} ${url} | ${statusCode} | ${userAgent}`);
        });
        next();
      });
    }

    app.use(compression());
    if (hasRawBodyParser) {
      app.use(bodyParser.raw({limit: '50mb', inflate: true, type: '*/*'}));
    } else {
      app.use(bodyParser.json({limit: '50mb'}));
      app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    }

    // FORBIDDEN TO COMMENT USAGE OF VALIDATION PIPES!!!
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    app.use((req, res, next) => {
      next();
    });

    const options = new DocumentBuilder()
      .setTitle(appName)
      .setDescription(appName + ' | Educlo')
      .addTag('users', 'User Management')
      .addTag('finance', 'Finance Management')
      .addTag('marketing', 'Marketing Management')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('open-api', app, document);

    return new AppModuleProxy(app, config);
  }
}
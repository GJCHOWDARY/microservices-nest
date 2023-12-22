import { Test, TestingModule } from '@nestjs/testing';
import { MarketingController } from './marketing.controller';
import { MarketingService } from './marketing.service';

describe('MarketingController', () => {
  let marketingController: MarketingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MarketingController],
      providers: [MarketingService],
    }).compile();

    marketingController = app.get<MarketingController>(MarketingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(marketingController.getHello()).toBe('Hello World!');
    });
  });
});

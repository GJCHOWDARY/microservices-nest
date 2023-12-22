import { Controller, Get } from '@nestjs/common';
import { MarketingService } from './marketing.service';

@Controller()
export class MarketingController {
  constructor(private readonly marketingService: MarketingService) {}

  @Get()
  getHello(): string {
    return this.marketingService.getHello();
  }
}

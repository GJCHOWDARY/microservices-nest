import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketingService {
  getHello(): string {
    return 'Hello World!';
  }
}

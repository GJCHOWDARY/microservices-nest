import { registerAs } from '@nestjs/config';

export default registerAs('http', () => ({
  port: process.env.PORT || 8080,
  apps: {
    apiGateway: process.env.PORT || 10080,
    finance: process.env.PORT || 11080,
    marketing: process.env.PORT || 12080,
    users: process.env.PORT || 13080,
  },
}));

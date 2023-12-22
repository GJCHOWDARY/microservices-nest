import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    educlo: {
      HOST: "154.27.66.190",
      USER: "root",
      PASSWORD: "gnet!@#",
      DB: "educa1_get",
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    },
  };
});

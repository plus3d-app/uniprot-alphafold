import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  await app.listen(3000).finally(() => {
    console.log('App is running in idle. Access http://localhost:3000 to proceed.')
  });
}
bootstrap();

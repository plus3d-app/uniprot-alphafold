import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000).finally(() => {
    console.log('App is running in idle. Access http://localhost:3000 to proceed.')
  });
}
bootstrap();

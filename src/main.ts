import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


// const base33 = require(__dirname + '/../src/assets/Base_33Tecidos_Ate_Uniprot__Missense_clean.csv');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

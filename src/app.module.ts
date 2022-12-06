import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AtomRepository } from './shared/repository/atom.repository';
import { CompondRepository } from './shared/repository/compond.repository';
import { PDBModelRepository } from './shared/repository/pdb-model.repository';
import { SequenceRepository } from './shared/repository/sequence.repository';
import { SourceRepository } from './shared/repository/source.repository';
import { TypeOrmConfig } from './shared/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    TypeOrmModule.forRoot(TypeOrmConfig),
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    AtomRepository,
    CompondRepository,
    PDBModelRepository,
    SequenceRepository,
    SourceRepository
  ],
})
export class AppModule {}

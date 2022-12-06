import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Atom } from './entity/atom.entity';
import { Compond } from './entity/compond.entity';
import { PDBModel } from './entity/pdb-model.entity';
import { Sequence } from './entity/sequence.entity';
import { Source } from './entity/source.entity';
import { TCGAEntry } from './entity/tcga-entry.entity';

import * as dotenv from 'dotenv';
dotenv.config();

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
  synchronize: true,
  entities: [
    Atom,
	Compond,
	PDBModel,
	Sequence,
	Source,
	TCGAEntry
  ],
  logging: false
};
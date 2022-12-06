import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Sequence } from '../entity/sequence.entity';

@Injectable()
export class SequenceRepository {
  constructor (private dataSource: DataSource) {}

  async findOne(parameters) {
    return this.dataSource.getRepository(Sequence).findOne(parameters);
  }

  async createSequence(
    sequence: any
  ): Promise<Sequence> {
    const {
		ser_num,
		chain_id,
		num_res,
		res_name,
		pdb_model_id
	} = sequence;
    const _sequence = new Sequence();
	_sequence.ser_num = ser_num;
	_sequence.chain_id = chain_id;
	_sequence.num_res = num_res;
	_sequence.res_name = res_name;
	_sequence.pdb_model_id = pdb_model_id;

    await _sequence.save();
    return _sequence;
  }
}
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Compond } from '../entity/compond.entity';

@Injectable()
export class CompondRepository {
  constructor (private dataSource: DataSource) {}

  async findOne(parameters) {
    return this.dataSource.getRepository(Compond).findOne(parameters);
  }

  async createCompond(
    compond: any
  ): Promise<Compond> {
    const {
      mol_id,
      molecule,
      chain,
      synonym,
      fragment,
      ec,
      mutation,
      engineered,
      pdb_model_id,
      other_details
    } = compond;
    const _compond = new Compond();
    _compond.mol_id = mol_id;
    _compond.molecule = molecule;
    _compond.chain = chain;
    _compond.synonym = synonym;
    _compond.fragment = fragment;
    _compond.ec = ec;
    _compond.mutation = mutation;
    _compond.engineered = engineered;
    _compond.other_details = other_details;
    _compond.pdb_model_id = pdb_model_id;

    await _compond.save();
    return _compond;
  }
}
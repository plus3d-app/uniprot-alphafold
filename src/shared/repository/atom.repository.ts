import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Atom } from '../entity/atom.entity';

@Injectable()
export class AtomRepository {
  constructor (private dataSource: DataSource) {}

  async findOne(parameters) {
    return this.dataSource.getRepository(Atom).findOne(parameters);
  }

  async createAtom(
    atom: any
  ): Promise<Atom> {
    const {
		alt_loc,
		chain_id,
		i_code,
		name,
		occupancy,
		res_name,
		res_seq,
		serial,
		charge,
		element,
		temp_factor,
		x,
		y,
		z,
		pdb_model_id
	} = atom;
    const _atom = new Atom();
	_atom.alt_loc = alt_loc;
	_atom.chain_id = chain_id;
	_atom.i_code = i_code;
	_atom.name = name;
	_atom.occupancy = occupancy;
	_atom.res_name = res_name;
	_atom.res_seq = res_seq;
	_atom.serial = serial;
	_atom.charge = charge;
	_atom.element = element;
	_atom.temp_factor = temp_factor;
	_atom.x = x;
	_atom.y = y;
	_atom.z = z;
	_atom.pdb_model_id = pdb_model_id;

    await _atom.save();
    return _atom;
  }
}
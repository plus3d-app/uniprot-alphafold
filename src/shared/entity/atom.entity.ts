import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { NumericTransformer } from '../numeric-transformer';
import { PDBModel } from './pdb-model.entity';

  @Entity('atom')
  export class Atom extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	p3d_id: number;

	@Column({ nullable: true })
	serial: number;

	@Column({ nullable: true })
	name: string;

	@Column({ nullable: true })
	alt_loc: string;

	@Column({ nullable: true })
	res_name: string;

	@Column({ nullable: true })
	chain_id: string;

	@Column({ nullable: true })
	res_seq: string;

	@Column({ nullable: true })
	i_code: string;

	@Column({ nullable: true })
	occupancy: number;

	@Column('numeric', {
		precision: 20,
		scale: 2,
		transformer: new NumericTransformer(),
		nullable: true
	})
	temp_factor?: number;

	@Column({ nullable: true })
	element?: string;

	@Column({ nullable: true })
	charge?: string;

	@Column('numeric', {
		precision: 20,
		scale: 2,
		transformer: new NumericTransformer(),
		nullable: true
	})
	x?: number;

	@Column('numeric', {
		precision: 20,
		scale: 2,
		transformer: new NumericTransformer(),
		nullable: true
	})
	y?: number;

	@Column('numeric', {
		precision: 20,
		scale: 2,
		transformer: new NumericTransformer(),
		nullable: true
  	})
	z?: number;

	@ManyToOne(() => PDBModel, pdb_model => pdb_model.atoms)
	@JoinColumn({
		referencedColumnName: 'p3d_id',
		name: 'pdb_model_id'
		})
	pdb_model: PDBModel;

	@Column({ nullable: true })
	pdb_model_id: number;
  }
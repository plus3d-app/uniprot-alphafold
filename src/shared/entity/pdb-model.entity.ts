import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Atom } from './atom.entity';
import { Compond } from './compond.entity';
import { Sequence } from './sequence.entity';
import { Source } from './source.entity';

@Entity('pdb_model')
export class PDBModel extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	p3d_id: number;

	@Column({ nullable: true })
	uniprot_id: string;

	@Column({ nullable: true })
	title: string;

	@Column({ nullable: true })
	conformer: string;

	@Column({ nullable: true })
	classification: string;

	@Column({ nullable: true })
	dep_date: string;

	@Column({ nullable: true })
	id_code: string;

	@Column({ nullable: true })
	filename: string;

	@Column('simple-array', { nullable: true })
	keywords: string[];

	@Column('simple-array', { nullable: true })
	authors: string[];

	@Column('simple-array', { nullable: true })
	exp_dtas: string[];

	@OneToMany(() => Compond, compond => compond.pdb_model)
	componds: Compond[];

	@OneToMany(() => Source, source => source.pdb_model)
	sources: Source[];

	@OneToMany(() => Sequence, sequence => sequence.pdb_model)
	sequences: Sequence[];

	@OneToMany(() => Atom, atom => atom.pdb_model)
	atoms: Atom[];
}
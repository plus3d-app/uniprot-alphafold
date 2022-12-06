import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { PDBModel } from './pdb-model.entity';

@Entity('sequence')
export class Sequence extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	p3d_id: number;

	@Column({ nullable: true })
	ser_num: number;

	@Column({ nullable: true })
	chain_id: string;

	@Column({ nullable: true })
	num_res: number;

	@Column('simple-array', { nullable: true })
	res_name: string[];

	@ManyToOne(() => PDBModel, pdb_model => pdb_model.sequences)
	@JoinColumn({
		referencedColumnName: 'p3d_id',
		name: 'pdb_model_id'
		})
	pdb_model: PDBModel;

	@Column({ nullable: true })
	pdb_model_id: number;
}
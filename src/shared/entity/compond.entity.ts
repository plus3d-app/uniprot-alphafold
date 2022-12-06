import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { PDBModel } from './pdb-model.entity';

@Entity('compond')
export class Compond extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	p3d_id: number;

	@Column({ nullable: true })
	mol_id: string;

	@Column({ nullable: true })
	molecule: string;

	@Column({ nullable: true })
	chain: string;

	@Column({ nullable: true })
	synonym: string;

	@Column({ nullable: true })
	fragment: string;

	@Column({ nullable: true })
	ec: string;

	@Column({ nullable: true })
	mutation: string;

	@Column({ nullable: true })
	engineered: boolean;

	@Column({ nullable: true })
	other_details: string;

	@ManyToOne(() => PDBModel, pdb_model => pdb_model.componds)
	@JoinColumn({
		referencedColumnName: 'p3d_id',
		name: 'pdb_model_id'
		})
	pdb_model: PDBModel;

	@Column({ nullable: true })
	pdb_model_id: number;
}
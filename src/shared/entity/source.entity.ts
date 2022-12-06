import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { PDBModel } from './pdb-model.entity';

@Entity('source')
export class Source extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	p3d_id: number;

	@Column({ nullable: true })
	mol_id: string;

	@Column({ nullable: true })
    synthetic: string;

	@Column({ nullable: true })
    fragment: string;

	@Column({ nullable: true })
    organism_scientific: string;

	@Column({ nullable: true })
    organism_common: string;

	@Column({ nullable: true })
    organism_taxid: string;

	@Column({ nullable: true })
    strain: string;

	@Column({ nullable: true })
    variant: string;

	@Column({ nullable: true })
    cell_line: string;

	@Column({ nullable: true })
    atcc: string;

	@Column({ nullable: true })
    organ: string;

	@Column({ nullable: true })
    tissue: string;

	@Column({ nullable: true })
    cell: string;

	@Column({ nullable: true })
    organelle: string;

	@Column({ nullable: true })
    secretion: string;

	@Column({ nullable: true })
    cellular_location: string;

	@Column({ nullable: true })
	plasmid: string;

	@Column({ nullable: true })
    gene: string;

	@Column({ nullable: true })
    expression_system: string;

	@Column({ nullable: true })
    expression_system_common: string;

	@Column({ nullable: true })
    expression_system_taxid: string;

	@Column({ nullable: true })
    expression_system_strain: string;

	@Column({ nullable: true })
    expression_system_variant: string;

	@Column({ nullable: true })
    expression_system_cell_line: string;

	@Column({ nullable: true })
    expression_system_atcc_number: string;

	@Column({ nullable: true })
    expression_system_organ: string;

	@Column({ nullable: true })
    expression_system_tissue: string;

	@Column({ nullable: true })
    expression_system_cell: string;

	@Column({ nullable: true })
    expression_system_organelle: string;

	@Column({ nullable: true })
    expression_system_cellular_location: string;

	@Column({ nullable: true })
    expression_system_vector_type: string;

	@Column({ nullable: true })
    expression_system_vector: string;

	@Column({ nullable: true })
    expression_system_plasmid: string;

	@Column({ nullable: true })
    expression_system_gene: string;

	@Column({ nullable: true })
    other_details: string;

	@ManyToOne(() => PDBModel, pdb_model => pdb_model.sources)
	@JoinColumn({
		referencedColumnName: 'p3d_id',
		name: 'pdb_model_id'
		})
	pdb_model: PDBModel;

	@Column({ nullable: true })
	pdb_model_id: number;
}
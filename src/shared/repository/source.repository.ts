import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Source } from '../entity/source.entity';

@Injectable()
export class SourceRepository {
  constructor (private dataSource: DataSource) {}

  async findOne(parameters) {
    return this.dataSource.getRepository(Source).findOne(parameters);
  }

  async createSource(
    source: any
  ): Promise<Source> {
    const {
		mol_id,
		synthetic,
		fragment,
		organism_scientific,
		organism_common,
		organism_taxid,
		strain,
		variant,
		cell_line,
		atcc,
		organ,
		tissue,
		cell,
		organelle,
		secretion,
		cellular_location,
		plasmid,
		gene,
		expression_system,
		expression_system_common,
		expression_system_taxid,
		expression_system_strain,
		expression_system_variant,
		expression_system_cell_line,
		expression_system_atcc_number,
		expression_system_organ,
		expression_system_tissue,
		expression_system_cell,
		expression_system_organelle,
		expression_system_cellular_location,
		expression_system_vector_type,
		expression_system_vector,
		expression_system_plasmid,
		expression_system_gene,
		other_details,
		pdb_model_id
	} = source;
    const _source = new Source();
	_source.mol_id = mol_id;
	_source.synthetic = synthetic;
    _source.fragment = fragment;
    _source.organism_scientific = organism_scientific;
    _source.organism_common = organism_common;
    _source.organism_taxid = organism_taxid;
    _source.strain = strain;
    _source.variant = variant;
    _source.cell_line = cell_line;
    _source.atcc = atcc;
    _source.organ = organ;
    _source.tissue = tissue;
    _source.cell = cell;
    _source.organelle = organelle;
    _source.secretion = secretion;
    _source.cellular_location = cellular_location;
	_source.plasmid = plasmid;
    _source.gene = gene;
    _source.expression_system = expression_system;
    _source.expression_system_common = expression_system_common;
    _source.expression_system_taxid = expression_system_taxid;
    _source.expression_system_strain = expression_system_strain;
    _source.expression_system_variant = expression_system_variant;
    _source.expression_system_cell_line = expression_system_cell_line;
    _source.expression_system_atcc_number = expression_system_atcc_number;
    _source.expression_system_organ = expression_system_organ;
    _source.expression_system_tissue = expression_system_tissue;
    _source.expression_system_cell = expression_system_cell;
    _source.expression_system_organelle = expression_system_organelle;
    _source.expression_system_cellular_location = expression_system_cellular_location;
    _source.expression_system_vector_type = expression_system_vector_type;
    _source.expression_system_vector = expression_system_vector;
    _source.expression_system_plasmid = expression_system_plasmid;
    _source.expression_system_gene = expression_system_gene;
    _source.other_details = other_details;
	_source.pdb_model_id = pdb_model_id;

    await _source.save();
    return _source;
  }
}
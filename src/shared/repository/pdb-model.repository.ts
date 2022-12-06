import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { PDBModel } from '../entity/pdb-model.entity';
import { AtomRepository } from './atom.repository';
import { Atom } from '../entity/atom.entity';
import { CompondRepository } from './compond.repository';
import { SequenceRepository } from './sequence.repository';
import { SourceRepository } from './source.repository';
import { Compond } from '../entity/compond.entity';
import { Source } from '../entity/source.entity';
import { Sequence } from '../entity/sequence.entity';

@Injectable()
export class PDBModelRepository {
  constructor (
	private dataSource: DataSource,
    @Inject(AtomRepository)
    private atomRepository: AtomRepository,
    @Inject(CompondRepository)
    private compondRepository: CompondRepository,
    @Inject(SequenceRepository)
    private sequenceRepository: SequenceRepository,
    @Inject(SourceRepository)
    private sourceRepository: SourceRepository,
  ) {}

  async findOne(parameters) {
    return this.dataSource.getRepository(PDBModel).findOne(parameters);
  }

  async createPDBModel(
    pdb_model: any
  ): Promise<PDBModel> {
    const {
		uniprot_id,
		title,
		conformer,
		classification,
		dep_date,
		id_code,
		keywords,
		authors,
		exp_dtas,
		componds,
		sources,
		sequences,
		atoms,
		filename
    } = pdb_model;
    const _pdb_model = new PDBModel();
	_pdb_model.uniprot_id = uniprot_id;
	_pdb_model.title = title;
	_pdb_model.conformer = conformer;
	_pdb_model.classification = classification;
	_pdb_model.dep_date = dep_date;
	_pdb_model.id_code = id_code;
	_pdb_model.keywords = keywords;
	_pdb_model.authors = authors;
	_pdb_model.exp_dtas = exp_dtas;
	_pdb_model.filename = filename;

    await _pdb_model.save();

    for (let source of sources) {
		let _source = new Source();
		_source.mol_id = source.MOL_ID;
		_source.synthetic = source.SYNTHETIC;
		_source.fragment = source.FRAGMENT;
		_source.organism_scientific = source.ORGANISM_SCIENTIFIC;
		_source.organism_common = source.ORGANISM_COMMON;
		_source.organism_taxid = source.ORGANISM_TAXID;
		_source.strain = source.STRAIN;
		_source.variant = source.VARIANT;
		_source.cell_line = source.CELL_LINE;
		_source.atcc = source.ATCC;
		_source.organ = source.ORGAN;
		_source.tissue = source.TISSUE;
		_source.cell = source.CELL;
		_source.organelle = source.ORGANELLE;
		_source.secretion = source.SECRETION;
		_source.cellular_location = source.CELLULAR_LOCATION;
		_source.plasmid = source.PLASMID;
		_source.gene = source.GENE;
		_source.expression_system = source.EXPRESSION_SYSTEM;
		_source.expression_system_common = source.EXPRESSION_SYSTEM_COMMON;
		_source.expression_system_taxid = source.EXPRESSION_SYSTEM_TAXID;
		_source.expression_system_strain = source.EXPRESSION_SYSTEM_STRAIN;
		_source.expression_system_variant = source.EXPRESSION_SYSTEM_VARIANT;
		_source.expression_system_cell_line = source.EXPRESSION_SYSTEM_CELL_LINE;
		_source.expression_system_atcc_number = source.EXPRESSION_SYSTEM_ATCC_NUMBER;
		_source.expression_system_organ = source.EXPRESSION_SYSTEM_ORGAN;
		_source.expression_system_tissue = source.EXPRESSION_SYSTEM_TISSUE;
		_source.expression_system_cell = source.EXPRESSION_SYSTEM_CELL;
		_source.expression_system_organelle = source.EXPRESSION_SYSTEM_ORGANELLE;
		_source.expression_system_cellular_location = source.EXPRESSION_SYSTEM_CELLULAR_LOCATION;
		_source.expression_system_vector_type = source.EXPRESSION_SYSTEM_VECTOR_TYPE;
		_source.expression_system_vector = source.EXPRESSION_SYSTEM_VECTOR;
		_source.expression_system_plasmid = source.EXPRESSION_SYSTEM_PLASMID;
		_source.expression_system_gene = source.EXPRESSION_SYSTEM_GENE;
		_source.other_details = source.OTHER_DETAILS;
		_source.pdb_model_id = _pdb_model.p3d_id;
		_source.pdb_model = _pdb_model;
		await _source.save();
    }

    for (let compond of componds) {
		let _compond = new Compond();
		_compond.mol_id = compond.MOL_ID;
		_compond.molecule = compond.MOLECULE;
		_compond.chain = compond.CHAIN;
		_compond.synonym = compond.SYNONYM;
		_compond.fragment = compond.FRAGMENT;
		_compond.ec = compond.EC;
		_compond.mutation = compond.MUTATION;
		_compond.engineered = compond.ENGINEERED;
		_compond.other_details = compond.OTHER_DETAILS;
		_compond.pdb_model_id = _pdb_model.p3d_id;
		_compond.pdb_model = _pdb_model;
		await _compond.save();
    }

	for (let sequence of sequences) {
		let _sequence = new Sequence();
		_sequence.ser_num = sequence.serNum;
		_sequence.chain_id = sequence.chainID;
		_sequence.num_res = sequence.numRes;
		_sequence.res_name = sequence.resNames;
		_sequence.pdb_model_id = _pdb_model.p3d_id;
		_sequence.pdb_model = _pdb_model;
		await _sequence.save();
	}

    for (let atom of atoms) {
		let _atom = new Atom();
		_atom.alt_loc = atom.altLoc;
		_atom.chain_id = atom.chainID;
		_atom.i_code = atom.iCode;
		_atom.name = atom.name;
		_atom.occupancy = atom.occupancy;
		_atom.res_name = atom.resName;
		_atom.res_seq = atom.resSeq;
		_atom.serial = atom.serial;
		_atom.charge = atom.charge;
		_atom.element = atom.element;
		_atom.temp_factor = atom.tempFactor;
		_atom.x = atom.y;
		_atom.y = atom.x;
		_atom.z = atom.z;
		_atom.pdb_model_id = _pdb_model.p3d_id;
		_atom.pdb_model = _pdb_model;
		await _atom.save();
    }

    return _pdb_model;
  }
}
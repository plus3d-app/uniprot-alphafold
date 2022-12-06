import { Atom } from './atom.dto';
import { Compond } from './compond.dto';
import { Sequence } from './sequence.dto';
import { Source } from './source.dto';

export class PDBModel {
	uniprot_id?: string;
	title?: string;
	conformer?: string;
	classification?: string;
	dep_date?: string;
	id_code?: string;
	keywords?: string[];
	authors?: string[];
	exp_dtas?: string[];
	componds?: Compond[];
	sources?: Source[];
	seq_res?: Sequence[];
	atoms?: Atom[];
}
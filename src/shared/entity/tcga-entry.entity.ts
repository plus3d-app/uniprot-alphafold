import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tcga_entry')
export class TCGAEntry extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	p3d_id: number;

	// @Column({ nullable: true })
	// CHROM: string;

    // @Column({ nullable: true })
	// POS: string;

    @Column({ nullable: true })
	REF: string;

    @Column({ nullable: true })
	ALT: string;

    @Column({ nullable: true })
	avsnp150: string;

    @Column({ nullable: true })
	Interpro_domain: string;

    @Column({ nullable: true })
	dbNSFP_DEOGEN2_pred: string;

    @Column({ nullable: true })
	dbNSFP_MetaSVM_pred: string;

    @Column({ nullable: true })
	dbNSFP_fathmmMKL_coding_pred: string;

    @Column({ nullable: true })
	dbNSFP_PrimateAI_pred: string;

    @Column({ nullable: true })
	dbNSFP_PROVEAN_pred: string;

    @Column({ nullable: true })
	dbNSFP_MCAP_pred: string;

    @Column({ nullable: true })
	dbNSFP_ClinPred_pred: string;

    @Column({ nullable: true })
	dbNSFP_BayesDel_addAF_pred: string;

    @Column({ nullable: true })
	dbNSFP_ExAC_AF: string;

    @Column({ nullable: true })
	dbNSFP_Polyphen2_HVAR_pred: string;

    @Column({ nullable: true })
	dbNSFP_SIFT_pred: string;

    @Column({ nullable: true })
	dbNSFP_FATHMM_pred: string;

    @Column({ nullable: true })
	dbNSFP_SIFT4G_pred: string;

    @Column({ nullable: true })
	dbNSFP_LRT_pred: string;

    @Column({ nullable: true })
	dbNSFP_fathmmXF_coding_pred: string;

    @Column({ nullable: true })
	dbNSFP_BayesDel_noAF_pred: string;

    @Column({ nullable: true })
	dbNSFP_gnomAD_exomes_AF: string;

    @Column({ nullable: true })
	dbNSFP_Aloft_pred: string;

    @Column({ nullable: true })
	dbNSFP_MutationTaster_pred: string;

    @Column({ nullable: true })
	dbNSFP_MetaLR_pred: string;

    @Column({ nullable: true })
	dbNSFP_LISTS2_pred: string;

    @Column({ nullable: true })
	dbNSFP_Polyphen2_HDIV_pred: string;

    @Column({ nullable: true })
	dbNSFP_MutationAssessor_pred: string;

    @Column({ nullable: true })
	VariantEffect_EFF: string;

    @Column({ nullable: true })
	Risco_Mut_EFF: string;

    @Column({ nullable: true })
	Tipo_Mut_EFF: string;

    @Column({ nullable: true })
	Point_Mutation_EFF: string;

    @Column({ nullable: true })
	changeProt_EFF: string;

    @Column({ nullable: true })
	changecDNA_EFF: string;

    @Column({ nullable: true })
	Gene_EFF: string;

    @Column({ nullable: true })
	RefSeq_EFF: string;

    @Column({ nullable: true })
	Exon_EFF: string;

    @Column({ nullable: true })
	ALT_EFF: string;

    @Column({ nullable: true })
	Pos_Point_Mutation_EFF: string;

    @Column({ nullable: true })
	poschangecDNA_EFF: string;

    @Column({ nullable: true })
	typechangecDNA_EFF: string;

    @Column({ nullable: true })
	aminBefore: string;

    @Column({ nullable: true })
	aminAfter: string;

    @Column({ nullable: true })
	poschangeProt: string;

    @Column({ nullable: true })
	typechangeProt: string;

    @Column({ nullable: true })
	pos_terminalchangeProt: string;

    @Column({ nullable: true })
	Chrom: string;

    @Column({ nullable: true })
	Pos: string;

    @Column({ nullable: true })
	SNP_ID_COMMON: string;

    @Column({ nullable: true })
	COMMON: string;

    @Column({ nullable: true })
	PolyPhen2_Dam_pred: string;

    @Column({ nullable: true })
	Ndamage: string;

    @Column({ nullable: true })
	NdamageCalc: string;

    @Column({ nullable: true })
	Deleteria: string;

    @Column({ nullable: true })
	Deleteria5: string;

    @Column({ nullable: true })
	Deleteria10: string;

    @Column({ nullable: true })
	transcript_NCBI_id: string;

    @Column({ nullable: true })
	Uniprot_id: string;

    @Column({ nullable: true })
	Genes_Uniprot: string;

    @Column({ nullable: true })
	Tecido: string;
}
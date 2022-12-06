import { Inject, Injectable } from '@nestjs/common';
import { createReadStream, readdir, copyFile, writeFileSync } from 'fs';
import { parse } from 'csv-parse';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, take } from 'rxjs';
const parsePdb = require('parse-pdb');
const fs = require('fs');
const zlib = require('zlib');
import { PdbParser } from 'pdb-parser-js';
import { PDBModelRepository } from './shared/repository/pdb-model.repository';

@Injectable()
export class AppService {

  constructor(
    private readonly httpService: HttpService,
    @Inject(PDBModelRepository)
    private pdbModelRepository: PDBModelRepository
  ) {}

  tcga = [];
  uniprot_id_uniques = new Set<string>();

  async getHello() {
    return 'It works. See the execution log on node terminal!';
  }

  async getPAE(filename) {
      // this.httpService.get<File>('https://alphafold.ebi.ac.uk/files/' + filename.split('-model')[0] + '-predicted_aligned_error_v4.json');
    
      const { data } = await firstValueFrom(
        this.httpService.get<File>('https://alphafold.ebi.ac.uk/files/' + filename.split('-model')[0] + '-predicted_aligned_error_v4.json').pipe(
          catchError((error) => {
            console.log(error.response.data);
            throw 'An error happened!';
          }),
        ),
      );
      return data;
  }

  callback(err) {
    if (err) throw err;
  }

  // faz o parse do arquivo .csv e seleciona os arquivos alphafold com Uniprot_id correspondente
  async parse_copy() {
    const original_af_directory = process.env.original_af_directory;
    const destiny_cif_directory = process.env.destiny_cif_directory;
    const destiny_pdb_directory = process.env.destiny_pdb_directory;
    const uniprot_csv_file = process.env.uniprot_csv_file;
    
    console.log('Selecting Uniprot_id identifiers...')
    await createReadStream(uniprot_csv_file).pipe(parse({ delimiter: '	', from_line: 1, columns: true }))
    .on('data', (row) => {
      this.tcga.push(row['Uniprot_id']);
      this.uniprot_id_uniques.add(row['Uniprot_id']);
    }).on('end', () => {
      console.log('Finished selection. Total entries on .csv: ', this.tcga.length);
      console.log('Copying files...');
      let acc = 0;
      readdir(original_af_directory, (err, files) => {
        for(let file of files) {
          if (this.uniprot_id_uniques.has(file.split('-')[1])) {
            acc = acc + 1;
            if (file.split('v4')[1] === '.cif.gz') {
              copyFile(original_af_directory + file, destiny_cif_directory + file, this.callback);
              console.log('Found .CIF.GZ: ', file);
            } else {
              copyFile(original_af_directory + file, destiny_pdb_directory + file, this.callback);
              console.log('Found .PDB.GZ: ', file);
            }
          }
        }
        console.log('Total Uniprot_id (distinct): ', this.uniprot_id_uniques.size);
        console.log('Total files found (.cif + .pdb): ', acc);
      });
    });
  }

  unzip_files() {
    let counting = 0;

    const directoryFiles = fs.readdirSync(__dirname + '/../src/assets/pdb_files/');

    directoryFiles.forEach(filename => {
      if (filename !== '.DS_Store' && filename !== '.DS_St') {
        const fileContents = fs.createReadStream(__dirname + '/../src/assets/pdb_files/' + filename);
        const writeStream = fs.createWriteStream(__dirname + '/../src/assets/afpdbs/' + filename.slice(0, -3));
        fileContents.pipe(zlib.createUnzip()).pipe(writeStream);
        counting++;
        console.log('counting: ', counting);
      }
    });
  }

  async pdb_database() {
    // let filename = '4hhb.pdb';
    // const fileContents = fs.readFileSync(__dirname + '/../src/assets/' + filename, 'utf8');
    // const parser = new PdbParser();
    // parser.collect(fileContents.split('\n'));
    
    // fs.writeFileSync(__dirname + '/../src/assets/minha_estrutura.json', JSON.stringify(pdb_model));

    let counting = 0;
    const directoryFiles = fs.readdirSync(__dirname + '/../src/assets/afpdbs/');

    for (let filename of directoryFiles) {
      if (filename !== '.DS_Store' && filename !== '.DS_St') {
        const fileContents = fs.readFileSync(__dirname + '/../src/assets/afpdbs/' + filename, 'utf8');
        const parser = new PdbParser();
        parser.collect(fileContents.split('\n'));
        let my_pdb = parser.parse();
        let my_atoms = parsePdb(fileContents)['atoms'];
        
        let teste_pdb = {};
        teste_pdb['title'] = my_pdb.title.title;
        teste_pdb['uniprot_id'] = filename.split('-')[1];
        teste_pdb['conformer'] = filename.split('-')[2];
        teste_pdb['classification'] = my_pdb.title.header.classification;
        teste_pdb['dep_date'] = my_pdb.title.header.depDate;
        teste_pdb['id_code'] = my_pdb.title.header.idCode;
        teste_pdb['keywords'] = my_pdb.title.keywds;
        teste_pdb['authors'] = my_pdb.title.authors;
        teste_pdb['exp_dtas'] = my_pdb.title.expdtas;
        teste_pdb['componds'] = my_pdb.title.compnds;
        teste_pdb['sources'] = my_pdb.title.sources;
        teste_pdb['sequences'] = my_pdb.primaryStructure.seqress;
        teste_pdb['atoms'] = my_atoms;
        teste_pdb['filename'] = filename;
        const teste = await this.pdbModelRepository.createPDBModel(teste_pdb);
        // fs.writeFileSync(__dirname + '/../src/assets/afjsons/' + filename.slice(0, -3) + 'json', JSON.stringify(parser.parse()));
        counting++;
        console.log('counting: ', counting);
      }
    };
  }

  pdb_json() {
    
    // let filename = 'AF-A0A183-F1-model_v4.pdb';
    // const fileContents = fs.readFileSync(__dirname + '/../src/assets/' + filename, 'utf8');
    // const parser = new PdbParser();
    // parser.collect(fileContents.split('\n'));
    // fs.writeFileSync(__dirname + '/../src/assets/AF-A0A183-F1-model_v4.json', JSON.stringify(parser.parse()));


    let counting = 0;
    const directoryFiles = fs.readdirSync(__dirname + '/../src/assets/afpdbs/');

    directoryFiles.forEach(filename => {
      if (filename !== '.DS_Store' && filename !== '.DS_St') {
        const fileContents = fs.readFileSync(__dirname + '/../src/assets/afpdbs/' + filename, 'utf8');
        const parser = new PdbParser();
        parser.collect(fileContents.split('\n'));
        fs.writeFileSync(__dirname + '/../src/assets/afjsons/' + filename.slice(0, -3) + 'json', JSON.stringify(parser.parse()));
        // fs.writeFileSync(__dirname + '/../src/assets/afjsons/' + filename.slice(0, -3) + 'json', JSON.stringify(parsePdb(fileContents)));
        counting++;
        console.log('counting: ', counting);
      }
    });
  }

  lets_start() {
    // const stage = new NGL.Stage('');



    const file = fs.readFileSync('/Users/elionaimc/Projects/lasis/uniprot-alphafold/src/assets/AF-O14686-F1-model_v4.pdb', 'utf8');
    // const asJSON = parsePdb(file);
    // console.log('atoms: ', asJSON['atoms']);
    // console.log('seqRes: ', asJSON['seqRes']);
    const parser = new PdbParser()
    parser.collect(file.split('\n'))
    const asJSON = parser.parse();
    console.log('PDB: ', asJSON);





    // stage.loadFile(file).then(async (component) => {
    //   console.log('pdb_id: ', component['id']);
    //   console.log('title: ', component['title']);
    //   console.log('atomCount: ', component['atomCount']);
    //   console.log('bondCount: ', component['bondCount']);
    //   console.log('atoms: ', asJSON['atoms']);
    //   console.log('seqRes: ', asJSON['seqRes']);
    //   // this.lab3dcomponent = structure;
    //   // this.lab3dcomponent.autoView();
    //   // this.zoom = this.lab3dcomponent.getZoom();
    //   // this.colorScheme = 'bfactor';
    //   // this.useShape('cartoon');
    //   // await this.lab3dcomponent.addRepresentation('cartoon', {
    //   //   name: 'p3D',
    //   //   color: this.colorScheme
    //   // });
    //   // this.loaded = true;
    //   // this.showTitle = true;
    // })
  }

  // parsePDBToData() {
  //   const pdbString = fs.readFileSync(__dirname + '/../src/assets/AF-A0A183-F1-model_v4.pdb', 'utf8');
  //   const parsed = parsePdb(pdbString);
  //   parsed.atoms = [];
  //   console.log(JSON.stringify(parsed));
  // }

  // verifica os arquivos alphafold selecionados e baixa os arquivos de "Predicted Aligned Error" correspondentes
  pae_download() {
    // readdir(__dirname + '/../src/assets/pdb_files/', async (err, files) => {
    //   for(let file of files) {
    //     counting++;
    //     const fileContents = fs.createReadStream (__dirname + '/../src/assets/pdb_files/' + file);
        
    //     // const writeStream = fs.createWriteStream(__dirname + '/../src/assets/pae_files/' + file.split('.')[0] + '.' + file.split('.')[1]);
    //     const unzip = zlib.createGunzip({'Content-Encoding': 'deflate'}); 

    //     fileContents.pipe(unzip); //.pipe(writeStream);
    //     unzip.on('data', function(data) {

    //       fs.writeFileSync(__dirname + '/../src/assets/pae_files/' + file.split('.')[0] + '.' + file.split('.')[1], data.toString());

    //     }).on("end", function() {

    //       console.log('counting: ', counting);

    //     })
          
        

    //     // fileContents.pipe(unzip).pipe(data => console.log(parsePdb(data)));





    //     // counting += 1;
    //     // // let myfile = await this.getPAE(file);
    //     // const { data } = await firstValueFrom(
    //     //   this.httpService.get<File>('https://alphafold.ebi.ac.uk/files/' + file.split('-model')[0] + '-predicted_aligned_error_v4.json').pipe(
    //     //     catchError((error) => {
    //     //       console.log(error.response.data);
    //     //       throw 'An error happened!';
    //     //     }),
    //     //   ),
    //     // );
    //     // // console.log(data);
    //     //   const fileContents = fs.createReadStream(data);
    //     //   const writeStream = fs.createWriteStream(__dirname + '/../src/assets/pae_files/' + file.split('-model')[0] + '-predicted_aligned_error_v4.json');
    //     //   fileContents.pipe(writeStream);
    //   //  console.log(file)
    //   }
    // });
  }
}

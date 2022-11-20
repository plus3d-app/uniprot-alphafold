import { Injectable } from '@nestjs/common';
import { createReadStream, readdir, copyFile } from 'fs';
import { parse } from 'csv-parse';
const wget = require('node-wget');

@Injectable()
export class AppService {
  columns_names = [];
  tcga = [];
  myfiles = new Set<string>();
  uniprot_id_uniques = new Set<string>();

  async getHello() {
    return 'It works. See the execution log on node terminal!';
  }

  callback(err) {
    if (err) throw err;
  }

  // faz o parse do arquivo .csv e seleciona os arquivos alphafold com Uniprot_id correspondente
  async parse_copy() {
    let original_af_directory = __dirname + '/../src/assets/UP000005640_9606_HUMAN_v4/';
    let destiny_cif_directory = __dirname + '/../src/assets/cif_files/';
    let destiny_pdb_directory = __dirname + '/../src/assets/pdb_files/';
    let original_uniprot_csv = __dirname + '/../src/assets/Base_33Tecidos_Ate_Uniprot__Missense_clean.csv';
    
    console.log('Selecting Uniprot_id identifiers...')
      await createReadStream(original_uniprot_csv).pipe(parse({ delimiter: "	", from_line: 1, columns: true }))
      .on('data', (id) => {
        this.tcga.push(id['Uniprot_id']);
        this.uniprot_id_uniques.add(id['Uniprot_id']);
      }).on('end', (data) => {
        console.log('Finished selection. Copying files...');
        console.log('.CSV total entries: ', this.tcga.length);
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
          console.log('Total Uniprot_id distinct: ', this.uniprot_id_uniques.size);
          console.log('Total files found (.cif + .pdb): ', acc);
        });
      });
  }

  // verifica os arquivos alphafold selecionados e baixa os arquivos de "Predicted Aligned Error" correspondentes
  async pae_download() {
    let counting = 0;
    readdir(__dirname + '/../src/assets/pdb_files/', async (err, files) => {
      for(let file of files) {
        await wget({
          url: 'https://alphafold.ebi.ac.uk/files/' + file.split('-model')[0] + '-predicted_aligned_error_v4.json',
          // url: 'https://alphafold.ebi.ac.uk/files/' + file,
          dest: __dirname + '/../src/assets/pae_files/'
        },
        function (error, response, body) {
          counting += 1;
          if (error) {
              console.log('--- ERROR');
              console.log('processing file: ', file.split('-model')[0]);
              console.log(error); // erro disparado
          } else {
              console.log('--- headers:');
              console.log(response.headers); // cabeçalho da resposta
          }
          console.log('counting: ', counting);
        })
      }
    });
  }
}

import { Injectable } from '@nestjs/common';
import { createReadStream, readdir, copyFile } from 'fs';
import { parse } from 'csv-parse';
const wget = require('node-wget');

@Injectable()
export class AppService {
  columns_names = [];
  proteins = [];
  myfiles = new Set<string>();

  async getHello() {
    // await this.parse_copy();
    await this.pae_download();
    return { msg: 'Verificando arquivos a serem baixados. Acompanhe o log de execução no terminal do node!' };
  }

  callback(err) {
    if (err) throw err;
  }

  // faz o parse do arquivo .csv e seleciona os arquivos alphafold com Uniprot_id correspondente
  async parse_copy() {
    await createReadStream(__dirname + '/../src/assets/Base_33Tecidos_Ate_Uniprot__Missense_clean.csv').pipe(parse({ delimiter: "	", from_line: 1, to_line: 1 }))
    .on("data", async (row) => {
      this.columns_names = row; // pega o nome de cada coluna do .csv
      await createReadStream(__dirname + '/../src/assets/Base_33Tecidos_Ate_Uniprot__Missense_clean.csv').pipe(parse({ delimiter: "	", from_line: 2 }))
      .on("data", (row) => {
        
        this.columns_names.forEach((label, index) => {
          if (label === 'Uniprot_id') this.proteins.push(row[index]); // corre uma busca nos dados selecionando a coluna Uniprot_id
        });

        readdir(__dirname + '/../src/assets/UP000005640_9606_HUMAN_v4/', (err, files) => {
          for(let file of files) {
            if (this.proteins.includes(file.split('-')[1]) && !this.myfiles.has(file)) {
              if (file.split('v4')[1] === '.cif.gz') {
                copyFile(__dirname + '/../src/assets/UP000005640_9606_HUMAN_v4/' + file, __dirname + '/../src/assets/cif_files/' + file, this.callback);
                console.log('arquivo .CIF.GZ movido: ', file);
              } else {
                copyFile(__dirname + '/../src/assets/UP000005640_9606_HUMAN_v4/' + file, __dirname + '/../src/assets/pdb_files/' + file, this.callback);
                console.log('arquivo .PDB.GZ movido: ', file.split('v4')[1]);
              }
              this.myfiles.add(file);
            }
          }
        });
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
          dest: __dirname + '/../src/assets/novos/'
        },
        function (error, response, body) {
          counting += 1;
          if (error) {
              console.log('--- ERROR');
              console.log('processing file: ', file.split('-model')[0]);
              console.log(error); // error encountered
          } else {
              console.log('--- headers:');
              console.log(response.headers); // response headers
              // console.log('--- body:');
              // console.log(body);             // content of package
          }
          console.log('counting: ', counting);
        })
      }
    });
  }
}

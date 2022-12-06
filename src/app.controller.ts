import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    // await this.appService.parse_copy();
    // await this.appService.pae_download();
    // await this.appService.unzip_files();
    // await this.appService.pdb_json();
    // await this.appService.lets_start();
    await this.appService.pdb_database();
    return this.appService.getHello();
  }
}

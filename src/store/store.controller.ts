import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Password } from 'src/auth/DTO/password.dto';
import { editFileName } from 'src/utils/constants';
import { CreateStoreDto } from './DTO/storeCreation.dto';
import { Store } from './models/store.model';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {

  constructor(private readonly storeService: StoreService) {

  }
  @Post('/create-store')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: editFileName,
    }),
  }))
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({})
  async storeRegister(@UploadedFile() file: Express.Multer.File, @Body() createStoreDto: CreateStoreDto) {
    return await this.storeService.registerStore(file, createStoreDto);
  }

  @Get('/:id')
  async getStoreById(@Param('id') id: string) {
    return this.storeService.getStore(id);
  }
  @Get('/all')
  async getAllStores(): Promise<Store[]> {
    return this.storeService.getAllStores();

  }
  @Get('/activate/:id')
  async activateStore(@Param('id') id: string): Promise<any> {

    return this.storeService.activate(id);
  }

  @Post('/update')
  async updateStore(@Body() newStore: Store): Promise<any> {
    return this.storeService.updateStore(newStore);
  }

  @Post('/update-password/:id')
  async updatePasswordStore(@Param('id') id: string, @Body() newPassword: Password): Promise<any> {
    //return newPassword
    return this.storeService.updatePasswordStore(newPassword, id);
  }
  @Delete('/delete/:id')
  deleteStore(@Param('id') id: string) {
    return this.storeService.deleteStore(id);
  }

  /**
 
   * - when the store asks for partnership a new store is created with the status "deactivated" : 
   * (name,email, website, address and papers (prove that they are a legal store/market) ) 
   * - the admin could consult the list of deactivated stores : change the status to activate if he accepts + an email is sent with the username and password 
   * the partnership or delete the store if he refuse + an email is sent  
   * 
   */

  @Get('/get-partnership-requests')
  getPartnershipRequests(): Promise<any> {
    return this.storeService.getPartnershipRequests()
  }
}

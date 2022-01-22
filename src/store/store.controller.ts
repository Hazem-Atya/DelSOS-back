import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse, ApiHeader } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { retry } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/auth-guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { EmailDto } from 'src/auth/DTO/email.dto';
import { ForgotPasswordDto } from 'src/auth/DTO/forgotPassword.dto';
import { updatePasswordDto } from 'src/auth/DTO/updatePassword.dto';
import { editFileName } from 'src/utils/constants';
import { CreateStoreDto } from './DTO/storeCreation.dto';
import { Store } from './models/store.model';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}
  @Post('/create-store')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
    }),
  )
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({})
  async storeRegister(
    @UploadedFile() file: Express.Multer.File,
    @Body() createStoreDto: CreateStoreDto,
  ) {
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
  async updateStore(@Body() newStore): Promise<any> {
    return this.storeService.updateStore(newStore);
  }

  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for authentification.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/update-password')
  async updatePasswordStore(
    @Body() passwordData: updatePasswordDto,
    @GetUser() store,
  ): Promise<any> {
    return this.storeService.updatePasswordStore(passwordData, store._id);
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
    return this.storeService.getPartnershipRequests();
  }

  @Post('/forgot-password')
  @ApiCreatedResponse({})
  async forgotPassword(@Body() emailInfo: EmailDto) {
    return await this.storeService.forgotPassword(emailInfo.email);
  }

  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for authentification.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/reset-password')
  @ApiCreatedResponse({})
  async resetPassword(
    @Body() passwordInfo: ForgotPasswordDto,
    @GetUser() user,
  ) {
    return await this.storeService.resetPassword(passwordInfo, user);
  }
}

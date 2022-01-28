import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse, ApiHeader } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { retry } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/auth-guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { EmailDto } from 'src/auth/DTO/email.dto';
import { ForgotPasswordDto } from 'src/auth/DTO/forgotPassword.dto';
import { Password } from 'src/auth/DTO/password.dto';
import { editFileName } from 'src/utils/constants';
import { ROLE } from 'src/utils/enum';
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


  @Get('/all/activated')
  @UseGuards(JwtAuthGuard)
  async getAllActivatedStores(
    @GetUser() user
  ): Promise<Store[]> {
    if(user.role!=ROLE.admin)
    {
      throw new UnauthorizedException('ACCESS UNOTHORIZED');
    }
    return this.storeService.getAllActivatedStores();
  }

  @Get('/all/deactivated')
  @UseGuards(JwtAuthGuard)
  async getAllDeactivatedStores(
    @GetUser() user
  ): Promise<Store[]> {
    if(user.role!=ROLE.admin)
    {
      throw new UnauthorizedException('ACCESS UNOTHORIZED');
    }
    return this.storeService.getAllDesactivatedStores();
  }

  @Get('/:id')
  async getStoreById(@Param('id') id: string) {
    return this.storeService.getStore(id);
  }
  @Get('/activate/:id')
  async activateStore(@Param('id') id: string): Promise<any> {
    return this.storeService.activate(id);
  }

  @Post('/update')
  @UseGuards(JwtAuthGuard)
  async updateStore(@Body() newStore, @GetUser() store): Promise<any> {
    console.log(newStore);
    return this.storeService.updateStore(store._id,newStore);
  }

  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for authentification.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/update-password')
  async updatePasswordStore(
    @Body() passwordData: Password,
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

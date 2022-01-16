import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiHeader, ApiTags } from '@nestjs/swagger';
import { CreateShopperDto } from './DTO/shopperCreation.dto';
import { CreateStoreDto } from './DTO/storeCreation.dto';
import { EmailDto } from 'src/auth/DTO/email.dto';
import { JwtAuthGuard } from 'src/auth/auth-guards/jwt-auth.guard';
import { ForgotPasswordDto } from 'src/auth/DTO/forgotPassword.dto';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/utils/constants';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/create-shopper')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({})
  async shopperRregister(@Body() createShopperDto: CreateShopperDto) {
    return await this.userService.registerShopper(createShopperDto);
  }


  @Post('/create-store')
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
    destination: './uploads',
    filename: editFileName,
    }),
    }))
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({})
  async storeRegister(@UploadedFile() file : Express.Multer.File, @Body() createStoreDto: CreateStoreDto) {
    return await this.userService.registerStore(file,createStoreDto);
  }



  @Post('/forgot-password')
  @ApiCreatedResponse({})
  async forgotPassword(@Body() emailInfo: EmailDto) {
    return await this.userService.forgotPassword(emailInfo.email);
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
    return await this.userService.resetPassword(passwordInfo, user);
  }

  @Get('shopper/:id')
  async getShopperById(@Param('id') id: string) {
    return this.userService.getShopper(id);
  }
  @Get('shopper/:id')
  async getStoreById(@Param('id') id: string) {
    return this.userService.getStore(id);
  }
}

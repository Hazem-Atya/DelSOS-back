import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiHeader, ApiTags } from '@nestjs/swagger';
import { CreateShopperDto } from './DTO/shopperCreation.dto';
import { CreateStoreDto } from './DTO/storeCreation.dto';
import { EmailDto } from 'src/auth/DTO/email.dto';
import { JwtAuthGuard } from 'src/auth/auth-guards/jwt-auth.guard';
import { ForgotPasswordDto } from 'src/auth/DTO/forgotPassword.dto';
import { GetUser } from 'src/auth/decorators/user.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/create-shopper')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({})
    async shopperRregister(@Body() createShopperDto: CreateShopperDto) {
    //  return createShopperDto;
      return await this.userService.registerShopper(createShopperDto);
    }
  

  @Post('/create-store')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({})
    async storeRegister(@Body() createStoreDto: CreateStoreDto) {
    //  return createShopperDto;
      return await this.userService.registerStore(createStoreDto);
    }
  
  getShopperById() {
    
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
}

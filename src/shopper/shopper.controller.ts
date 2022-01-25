import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiHeader } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth-guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { EmailDto } from 'src/auth/DTO/email.dto';
import { ForgotPasswordDto } from 'src/auth/DTO/forgotPassword.dto';
import { updatePasswordDto } from 'src/auth/DTO/updatePassword.dto';
import { PaginationParams } from 'src/utils/pagination.params';
import { CreateShopperDto } from './DTO/shopperCreation.dto';
import { Shopper } from './models/shopper.model';
import { ShopperService } from './shopper.service';

@Controller('shopper')
export class ShopperController {
  constructor(private readonly shopperService: ShopperService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({})
  async shopperRregister(@Body() createShopperDto: CreateShopperDto) {
    console.log(createShopperDto);
    return await this.shopperService.registerShopper(createShopperDto);
  }

  @Get('/:id')
  async getShopperById(@Param('id') id: string) {
    return this.shopperService.getShopper(id);
  }
  @Get('/shoppers/all')
  async getAllShoppers(): Promise<Shopper[]> {
    return this.shopperService.getAll();
  }
  @Get('get/all')
  async getAllWithPagination(
    @Query() { skip, limit }: PaginationParams,
  ): Promise<Shopper[]> {
    return this.shopperService.getAll_v2(skip, limit);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/update')
  async updateShopper(
    @Body() newShopper: Partial<Shopper>,
    @GetUser() shopper,
  ): Promise<any> {
    return this.shopperService.updateShopper(shopper._id,newShopper);
  }

  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for authentification.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/update-password')
  async updatePasswordShopper(
    @Body() passwordData: updatePasswordDto,
    @GetUser() shopper,
  ): Promise<any> {
    return this.shopperService.updateShopperPassword(passwordData, shopper._id);
  }

  @Delete('/delete/:id')
  async deleteShopper(@Param('id') id: string): Promise<any> {
    return this.shopperService.deleteShopper(id);
  }

  @Post('/forgot-password')
  @ApiCreatedResponse({})
  async forgotPassword(@Body() emailInfo: EmailDto) {
    return await this.shopperService.forgotPassword(emailInfo.email);
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
    return await this.shopperService.resetPassword(passwordInfo, user);
  }
}

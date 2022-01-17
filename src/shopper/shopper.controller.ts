import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Password } from 'src/auth/DTO/password.dto';
import { CreateShopperDto } from './DTO/shopperCreation.dto';
import { Shopper } from './models/shopper.model';
import { ShopperService } from './shopper.service';

@Controller('shopper')
export class ShopperController {
  constructor(private readonly shopperService: ShopperService) { }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({})
  async shopperRregister(@Body() createShopperDto: CreateShopperDto) {
    return await this.shopperService.registerShopper(createShopperDto);
  }

  @Get('/:id')
  async getShopperById(@Param('id') id: string) {
    return this.shopperService.getShopper(id);
  }
  @Get('/all')
  async getAllShoppers() : Promise<Shopper[]>{
    return this.shopperService.getAll();
  }

  @Post('/update')
  async updateShopper(@Body() newShopper: Partial<Shopper>):  Promise<any> { 
         return this.shopperService.updateShopper(newShopper);
  }

  @Post('/update-password/:id')
  async updatePasswordShopper(@Param('id') id: string, @Body() newPassword: Password): Promise<any> { 
    //return newPassword
   return this.shopperService.updateShopperPassword(newPassword, id);
}

  @Delete('/delete/:id')
  async deleteShopper(@Param('id') id: string): Promise<any> { 
    
    return this.shopperService.deleteShopper(id);
  }
  

}

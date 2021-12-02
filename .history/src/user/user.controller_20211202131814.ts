import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiHeader } from '@nestjs/swagger';
import { CreateShopperDto } from './DTO/shopperCreation.dto';
import { CreateStoreDto } from './DTO/storeCreation.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    ) {}

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
/* updateShopper() {
  
}
  updateStore() {
  
}
  updatePassword() {
  
}
  addAddress() {
  
}
  getStoreAccount() {
    
  } */
}


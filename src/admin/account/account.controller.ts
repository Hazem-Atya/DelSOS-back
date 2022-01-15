import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { identity } from 'rxjs';
import { Password } from 'src/user/DTO/password.dto';
import { Shopper } from 'src/user/models/shopper.model';
import { Store } from 'src/user/models/store.model';
import { UserService } from 'src/user/user.service';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {

  constructor(
    private readonly accountService: AccountService,
    
  ) { } 
  
/***
 * 
 * SHOPPERS
 * 
 */
  @Get('/shoppers')
  async getAllShoppers() : Promise<Shopper[]>{
    return this.accountService.getAll();

  }

  @Post('/update-shopper')
  async updateShopper(@Body() newShopper: Shopper):  Promise<any> { 
         return this.accountService.updateShopper(newShopper);
  }

  @Post('/update-password-shopper/:id')
  async updatePasswordShopper(@Param('id') id: string, @Body() newPassword: Password): Promise<any> { 
    //return newPassword
   return this.accountService.updateShopperPassword(newPassword, id);
}

  @Delete('/delete-shopper/:id')
  async deleteShopper(@Param('id') id: string): Promise<any> { 
    
    return this.accountService.deleteShopper(id);
  }
  
/***
 * 
 * STORES
 * 
 */

 @Get('/stores')
  async getAllStores() : Promise<Store[]>{
   return this.accountService.getAllStores();
    
 }
  @Get('/activate/:id')
   async activateStore(@Query() id : String): Promise<any> {
    return this.accountService.activate(id);
  }

  @Post('/update/store')
   async updateStore(@Body() newStore: Store): Promise<any> {
    return this.accountService.updateStore(newStore);
  }

  @Post('/update-password-store/:id')
  async updatePasswordStore(@Param('id') id: string, @Body() newPassword: Password): Promise<any> { 
    //return newPassword
   return this.accountService.updatePasswordStore(newPassword, id);
}
@Delete('/delete-store/:id')
  deleteStore(@Param('id') id : string ) {
  return this.accountService.deleteStore(id);
  } 
}

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
  async activateStore(@Param('id') id: string): Promise<any> {
    
    return this.accountService.activate(id);
  }

  @Post('/update-store')
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

  /**
 
   * - when the store asks for partnership a new store is created with the status "deactivated" : 
   * (name,email, website, address and papers (prove that they are a legal store/market) ) 
   * - the admin could consult the list of deactivated stores : change the status to activate if he accepts + an email is sent with the username and password 
   * the partnership or delete the store if he refuse + an email is sent  
   * 
   */

  @Get('/get-partnership-requests')
  getPartnershipRequests(): Promise<any> {
    return this.accountService.getPartnershipRequests()
  }
  
  
}

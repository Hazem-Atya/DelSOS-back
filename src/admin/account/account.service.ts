import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UpdateResult } from "mongodb";
import { Model } from "mongoose";
import { STATUS } from "src/user/models/enum";
import { Shopper, ShopperSchema } from "src/user/models/shopper.model";
import { Store } from "src/user/models/store.model";
import * as bcrypt from 'bcrypt';
import { Password } from "src/user/DTO/password.dto";
import { CrudService } from "src/utils/crud.service";
import { Injector } from "@nestjs/core/injector/injector";
import { MailService } from "src/mail/mail.service";
import { v4 as uuidv4 } from 'uuid';
import { Exception } from "handlebars";
@Injectable()
export class AccountService {

  constructor(
    @InjectModel('Shopper')
    private readonly shopperModel: Model<Shopper>,
    @InjectModel('Store')
    private readonly storeModel: Model<Store>,
    private readonly crudService: CrudService,
    private readonly mailService: MailService
  ) { }
 


//--------------------------------- SHOPPER MANAGEMENT --------------------------------- //
  async getAll(): Promise<Shopper[]> {
    return await this.shopperModel.find();
  }

  async updateShopper(newShopper: Shopper): Promise<any> {
   return this.crudService.update(this.shopperModel, newShopper);
  }

  async updateShopperPassword(password: Password, id: string): Promise<any> {
    return this.crudService.updatePassword(this.shopperModel, password.password, id);
  }
  
  async deleteShopper(id: string): Promise<any> {
    return this.crudService.delete(this.shopperModel, id);
  }


  //--------------------------------- STORE MANAGEMENT --------------------------------- //

  async getAllStores(): Promise<Store[]> {

    return await this.storeModel.find();
  }

  async updateStore(newStore: Store): Promise<any> {
    return this.crudService.update(this.storeModel, newStore);
  }

  updatePasswordStore(newPassword: Password, id: string): any {
    return this.crudService.updatePassword(this.storeModel, newPassword.password, id);
  }

  async deleteStore(id: string)  {
    return this.crudService.delete(this.storeModel, id);
  }

  async getPartnershipRequests(): Promise<any> {
    let stores = await this.storeModel.find({ 'status': 'DEACTIVATED' });
    if (!stores)  throw new NotFoundException('NOT FOUND')
    return stores
  }


  async activate(id: string): Promise<any> {
  
    const store = await this.storeModel.findById(id);
    
    if (store) {
      store.status = STATUS.activated;
      store.save();
      const mail = await this.mailService.activateStore({
        name: store.name, 
        username: store.username, 
        password : uuidv4()
      })
      console.log(mail)
      if (!mail) return "mail not sent"
        //throw new Exception('mail not sent')
      return store
    } else {
      throw new NotFoundException('store no found')
    }



  }

}
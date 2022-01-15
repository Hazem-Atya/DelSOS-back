import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UpdateResult } from "mongodb";
import { Model } from "mongoose";
import { STATUS } from "src/user/models/enum";
import { Shopper, ShopperSchema } from "src/user/models/shopper.model";
import { Store } from "src/user/models/store.model";
import * as bcrypt from 'bcrypt';
import { Password } from "src/user/DTO/password.dto";
@Injectable()
export class AccountService {


  constructor(
    @InjectModel('Shopper')
    private readonly shopperModel: Model<Shopper>,
    @InjectModel('Store')
    private readonly storeModel: Model<Store>,
   

  ) { }


  async getAll(): Promise<Shopper[]> {
    return await this.shopperModel.find();
  }

  async updateShopper(newShopper: Shopper): Promise<any> {
    
    if (newShopper) {
      let shopper: Promise<UpdateResult>;
      shopper = this.shopperModel.updateOne({ _id: newShopper._id }, newShopper).exec();
 
      if (!shopper) throw new NotFoundException('Could not found this shopper');
    
      return newShopper
    }
    return "new shopper not valid ";
  }

  async updateShopperPassword(password: Password, id: string): Promise<any> {

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password.password, salt);

    let shopper: UpdateResult;
    shopper = await this.shopperModel.updateOne({ _id: id }, { password: hashedPassword }).exec();
    
    if (!shopper) throw new NotFoundException('Could not found this shopper');
    
    return `password updated successfully`;
  }
  
  async deleteShopper(id: String): Promise<any> {

    const shopper = await this.shopperModel.findByIdAndDelete(id).exec();

    if (!shopper) throw new NotFoundException('Shopper not found');

    return shopper

  }



  //--------------------------------- STORE MANAGEMENT --------------------------------- //

  async getAllStores(): Promise<Store[]> {

    return await this.storeModel.find();
  }


  async activate(id: String): Promise<Store> {
    const store = await this.storeModel.findById(id);
    
    if (store) {
      store.status = STATUS.activated;
      store.save();
      return store
    } else {
      throw new NotFoundException('store no found')
    }
  }


  async updateStore(newStore: Store): Promise<any> {

    let store; 

    store = await this.storeModel.updateOne({ _id: newStore.id }, newStore);
   
    if (!store) throw new NotFoundException('Could not found this store');
    
    
    return store
  }




}
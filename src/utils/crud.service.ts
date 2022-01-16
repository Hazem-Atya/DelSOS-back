import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { Shopper } from "src/user/models/shopper.model";
import { Store } from "src/user/models/store.model";
import * as bcrypt from 'bcrypt';
import { UpdateResult } from "mongodb";

@Injectable()
export class CrudService {
  /**
   * 
   * CREATE
   * 
   */
  async create() {
    
  }

  /**
   * 
   * UPDATE
   * 
   */

  
  async update(model: Model<any>,newData : Shopper|Store) {
    if (newData) {
      let row: Promise<UpdateResult>;
      row = model.updateOne({ _id: newData._id }, newData).exec();
 
      if (!row) throw new NotFoundException('NOT FOUND');
    
      return row
    }
    return "Your data is not valid";
  }

  /**
   * 
   * UPDATE PASSWORD 
   * 
   */
  async updatePassword(model: Model<any>, newPass: string, id: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPass, salt);

    let user: UpdateResult;
    user = await model.updateOne({ _id: id }, { password: hashedPassword }).exec();
    
    if (!user) throw new NotFoundException('NOT FOUND');
    
    return `password updated successfully`;
  }


    /**
   * 
   * DELETE
   * 
   */
     async delete(model: Model<any>, id: string) {
      const row = await model.findByIdAndDelete(id).exec();
  
      if (!row) throw new NotFoundException('not found');
  
      return row
    }
}
import {
  HttpCode,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Store } from 'src/store/models/store.model';
import * as bcrypt from 'bcrypt';
import { UpdateResult } from 'mongodb';
import { Shopper } from 'src/shopper/models/shopper.model';
import { Exception } from 'handlebars/runtime';

@Injectable()
export class CrudService {
  /**
   *
   * CREATE
   *
   */
  async create() {}

  /**
   *
   * UPDATE
   *
   */

  async update(model: Model<any>, id, newData) {
    console.log(newData)
      try {
    if (newData) {
      await model.findByIdAndUpdate(id, newData, function (err, docs) { 
        if (err) {
          console.log(err);
         return  {'Error': err}
        } else { 
          const { password, ...updatedUser } = docs;
          return updatedUser;
        }
      });
    }
      }catch (err) {
        console.log('error', err)
        return  {'Error': err}
  }
   return {'Message': 'Your data is not valid'} ;
  }

  /**
   *
   * UPDATE PASSWORD
   *
   */

  async updatePassword(model: Model<any>,oldPass:string, newPass: string, id: string) {

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPass, salt);
    const password = await bcrypt.hash(oldPass, salt)

    let user: UpdateResult;
    let olduser = await model.findById(id).select('password')

     const testPassword = bcrypt.compareSync(oldPass, olduser.password);
     if(!testPassword) return "wrong password ! try again"
    user = await model
      .updateOne({ _id: id }, { password: hashedPassword })
      .exec();

    if (!user) throw new NotFoundException('NOT FOUND');

    return user;
  }

  /**
   *
   * DELETE
   *
   */
  async delete(model: Model<any>, id: string) {
    const row = await model.findByIdAndDelete(id).exec();

    if (!row) throw new NotFoundException('not found');

    return row;
  }
}

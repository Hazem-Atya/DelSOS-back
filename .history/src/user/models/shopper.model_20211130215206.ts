
import { ROLE } from './role.enum';
import * as mongoose from 'mongoose';

import { Prop, Schema } from '@nestjs/mongoose';



export const ShopperSchema = new mongoose.Schema({

   name: { type: String, },
   email: {
      type: String, required: true, lowercase: true, un
      maxlength: 255,
      minlength: 6,
   },
   password: { type: String, },
   username: { type: String, },
   age: { type: Number },
   phoneNumber: {type: Number},
   role: {
      type: String,
      default: ROLE.shopper,
   },

   lastLogin: {
      type: Date,
   },
   birthdate: {
      type: Date,
   },
 bankDetails: { owner: { type: String, default : ""}, cardNumber: { type: String, default : "" }, expirationDate : {type: Date, default : new Date()} }, 
    
  
 
   // range in kilometer where the shopper can deliver 
   range: { type: Number , default : 0},

   address: { type: String , default : "" },
}, { timestamps: true });


export interface Shopper extends mongoose.Document {

   username: string;
   email: string;
   password: string;
   name: string;
   age: number,
   phoneNumber: number,
   address: String, 
   role: string;
   bankDetails: Object;
   range: Array<number>;

}
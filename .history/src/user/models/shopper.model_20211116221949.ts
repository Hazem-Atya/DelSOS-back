
import { ROLE } from './role.enum';
import * as mongoose from 'mongoose';

import { Prop, Schema } from '@nestjs/mongoose';



export const ShopperSchema = new mongoose.Schema({

   name: { type: String, },
   email: {
      type: String, required: true, lowercase: true,
      maxlength: 255,
      minlength: 6,
   },
   password: { type: String, },
   username: { type: String, },

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
 
       bankDetails: { owner: { type: String, }, cardNumber: { type: String } }, 
       defaut : {}
  
 
   // range in kilometer where the shopper can deliver 
   range: { type: Number , default : 0},

   address: { type: String , default : "" },
}, { timestamps: true });


export interface Shopper extends mongoose.Document {

   name: string;
   username: string;
   email: string;
   password: string;
   role: string;
   bankDetails: Object;
   range: Array<number>;
   address: String,

}
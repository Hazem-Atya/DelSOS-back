import { Address } from './Address';
import { ROLE } from './role.enum';
import * as mongoose from 'mongoose';
import { BankDetails } from './BankDetails';
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
/*    bankDetails: {
    type : Object
   }, */
   // range in kilometer where the shopper can deliver 
   range: { type: Array(2) },

   address: { type: Address },
}, { timestamps: true });


export interface Shopper extends mongoose.Document {

   name: string;
   username: string;
   email: string;
   password: string;
   role: string;
   bankDetails: typeof BankDetails;
   range: Array<number>;
   address: Address,

}

import * as mongoose from 'mongoose';
import { ROLE } from './role.enum';


export const Store = new mongoose.Schema({
 
   name: { type: String, },
   email: {
      type: String, required: true, lowercase: true,
      maxlength: 255,
      minlength: 6,
   },
   password: { type: String,required: true  },
   username: { type: String, },

   role: {
      type: String,
      default: ROLE.store,
   },

   lastLogin: {
      type: Date,
   },
    address: {
      required: true ,
      type: Array<String>(),
   }, 
}, { timestamps: true });

export interface Store extends mongoose.Document {

   username: string;
   email: string;
   password: string;
   role: string;
 

}
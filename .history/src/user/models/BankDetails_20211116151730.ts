import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';



export const BankDetailsSchema  = new mongoose.Schema({
  owner: { type: String },
  number: { type: String, }
  
}
);

export interface Shopper extends mongoose.Document {
  
}
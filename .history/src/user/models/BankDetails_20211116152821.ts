import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';




export const BankDetails = new mongoose.Schema({
  owner: { type: String },
  number: { type: String, }
  
}
);

/* export interface BankDetails extends mongoose.Document {
  owner:string,
  number: string,
  
} */
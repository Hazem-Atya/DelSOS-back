import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';



export class BankDetails = new mongoose.Schema({
  owner: { type: String },
  number: { type: String, }
  
}
);
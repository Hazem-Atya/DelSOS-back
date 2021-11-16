import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

export type BankDetailsDocument = BankDetails & mongoose.Document;

export class BankDetails = new mongoose.Schema({
  owner: {type: string};
  number: string;
  
 }
 
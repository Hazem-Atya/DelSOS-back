import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

export type BankDetailsDocument = BankDetails & mongoose.Document;
@Schema()
export class BankDetails {
  @Prop()
  owner: string;
  @Prop()
  number: string;
  
 }
 export const BankDetailsSchema = SchemaFactory.createForClass(BankDetails);
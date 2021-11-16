"use strict";
exports.__esModule = true;
exports.BankDetails = void 0;
var mongoose = require("mongoose");
exports.BankDetails = new mongoose.Schema({
    owner: { type: String },
    number: { type: String }
});
/* export interface BankDetails extends mongoose.Document {
  owner:string,
  number: string,
  
} */ 

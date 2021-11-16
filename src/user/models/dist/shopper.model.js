"use strict";
exports.__esModule = true;
exports.ShopperSchema = void 0;
var role_enum_1 = require("./role.enum");
var mongoose = require("mongoose");
exports.ShopperSchema = new mongoose.Schema({
    name: { type: String },
    email: {
        type: String, required: true, lowercase: true,
        maxlength: 255,
        minlength: 6
    },
    password: { type: String },
    username: { type: String },
    role: {
        type: String,
        "default": role_enum_1.ROLE.shopper
    },
    lastLogin: {
        type: Date
    },
    birthdate: {
        type: Date
    },
    /*    nested: {
          bankDetails : { owner : {type: String,}, cardNumber : {type: String} }
       },
     */
    // range in kilometer where the shopper can deliver 
    range: { type: Array(2) }
}, { timestamps: true });

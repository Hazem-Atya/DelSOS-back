"use strict";
exports.__esModule = true;
exports.ShopperSchema = void 0;
var enum_1 = require("./enum");
var mongoose = require("mongoose");
exports.ShopperSchema = new mongoose.Schema({
    name: { type: String },
    email: {
        type: String, required: true, lowercase: true, unique: true,
        maxlength: 255,
        minlength: 6
    },
    password: { type: String },
    username: { type: String },
    age: { type: Number },
    phoneNumber: { type: Number },
    role: {
        type: String,
        "default": enum_1.ROLE.shopper
    },
    lastLogin: {
        type: Date
    },
    birthdate: {
        type: Date
    },
    bankDetails: { owner: { type: String, "default": "" }, cardNumber: { type: String, "default": "" }, expirationDate: { type: Date, "default": new Date() } },
    // range in kilometer where the shopper can deliver 
    range: { type: Number, "default": 0 },
    address: { type: String, "default": "" }
}, { timestamps: true });

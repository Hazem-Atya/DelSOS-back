"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AccountModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var shopper_model_1 = require("src/user/models/shopper.model");
var store_model_1 = require("src/user/models/store.model");
var account_controller_1 = require("./account.controller");
var account_service_1 = require("./account.service");
var AccountModule = /** @class */ (function () {
    function AccountModule() {
    }
    AccountModule = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: 'Shopper', schema: shopper_model_1.ShopperSchema }]),
                mongoose_1.MongooseModule.forFeature([{ name: 'Store', schema: store_model_1.StoreSchema }]),
            ],
            providers: [account_service_1.AccountService],
            controllers: [account_controller_1.AccountController]
        })
    ], AccountModule);
    return AccountModule;
}());
exports.AccountModule = AccountModule;

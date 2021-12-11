"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var user_module_1 = require("./user/user.module");
var auth_module_1 = require("./auth/auth.module");
var config_1 = require("@nestjs/config");
var account_module_1 = require("./admin/account/account.module");
var delivery_module_1 = require("./admin/delivery/delivery.module");
var mail_module_1 = require("./mail/mail.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                user_module_1.UserModule,
                auth_module_1.AuthModule,
                config_1.ConfigModule.forRoot({
                    isGlobal: true
                }),
                mongoose_1.MongooseModule.forRoot(process.env.CONNECTION_STRING),
                account_module_1.AccountModule,
                delivery_module_1.DeliveryModule,
                mail_module_1.MailModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

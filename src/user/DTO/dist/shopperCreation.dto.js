"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateShopperDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var CreateShopperDto = /** @class */ (function () {
    function CreateShopperDto() {
    }
    __decorate([
        swagger_1.ApiProperty({
            description: 'The name of the User',
            format: 'string',
            minLength: 6,
            maxLength: 255
        }),
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString(),
        class_validator_1.MinLength(5),
        class_validator_1.MaxLength(255)
    ], CreateShopperDto.prototype, "firstname");
    __decorate([
        swagger_1.ApiProperty({
            description: "The user's lastname",
            format: 'string',
            minLength: 6,
            maxLength: 255
        }),
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString(),
        class_validator_1.MinLength(5),
        class_validator_1.MaxLength(255)
    ], CreateShopperDto.prototype, "lastname");
    __decorate([
        swagger_1.ApiProperty({
            description: "The user's age",
            format: 'string'
        }),
        class_validator_1.IsNotEmpty()
    ], CreateShopperDto.prototype, "age");
    __decorate([
        swagger_1.ApiProperty({
            description: "The user's phone number ",
            format: 'Number'
        }),
        class_validator_1.IsNotEmpty(),
        class_validator_1.MinLength(8)
    ], CreateShopperDto.prototype, "phone");
    __decorate([
        swagger_1.ApiProperty({
            example: 'flen@gmail.com',
            description: 'The email of the User',
            format: 'email',
            uniqueItems: true,
            minLength: 5,
            maxLength: 255
        }),
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString(),
        class_validator_1.MinLength(5),
        class_validator_1.MaxLength(255),
        class_validator_1.IsEmail()
    ], CreateShopperDto.prototype, "email");
    __decorate([
        swagger_1.ApiProperty({
            example: 'TIKTAK',
            description: 'The password of the User',
            format: 'string',
            minLength: 5,
            maxLength: 1024
        }),
        swagger_1.ApiProperty(),
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString(),
        class_validator_1.MinLength(5),
        class_validator_1.MaxLength(1024)
    ], CreateShopperDto.prototype, "password");
    return CreateShopperDto;
}());
exports.CreateShopperDto = CreateShopperDto;
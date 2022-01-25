import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AffectShopperDTO {

    @IsNotEmpty()
    @IsEmail()
    shopperEmail: String;
    @IsNotEmpty()
    @IsString()
    deliveryId: String;
}
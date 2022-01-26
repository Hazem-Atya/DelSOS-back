import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AffectShopperDTO {
  @IsNotEmpty()
  @IsEmail()
  shopperEmail: string;
  @IsNotEmpty()
  @IsString()
  deliveryId: string;
}

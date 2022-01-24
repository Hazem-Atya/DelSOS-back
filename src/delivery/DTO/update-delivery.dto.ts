import { IsNotEmpty, IsString } from "class-validator";

export class UpdateDeliveryDTO {

    @IsNotEmpty()
    @IsString()
    deliveryId: String;
}
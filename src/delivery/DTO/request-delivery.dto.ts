import { IsNotEmpty, IsString } from "class-validator";

export class RequestDeliveryDTO {

    @IsNotEmpty()
    @IsString()
    deliveryId: String;
}
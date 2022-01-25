import { IsDate, IsNotEmpty, IsString, MaxLength } from "class-validator";


export class TrackingDTO {

    date: Date;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    description: string;
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    location: string;
}
export class AddTrackingDTO {

    @IsNotEmpty()
    deliveryId: string;
    @IsNotEmpty()
    tracking: TrackingDTO
}


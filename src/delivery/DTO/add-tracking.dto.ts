import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class TrackingDTO {
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;
}
export class AddTrackingDTO {
  @IsNotEmpty()
  deliveryId: string;
  @IsNotEmpty()
  tracking: TrackingDTO;
}

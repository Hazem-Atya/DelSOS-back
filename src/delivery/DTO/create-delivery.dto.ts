import { Type } from 'class-transformer';
import { ArrayUnique, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import * as mongoose from 'mongoose';
import { DELIVERY_TYPE, PRIORITY } from '../model/delivery.model';

export class CreateDeliveryDTO {
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    description: string;
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    @IsNotEmpty()
    source: string;
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    @IsNotEmpty()
    destination: string;
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    weight: number;
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    height: number;
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    width: number;
    @IsOptional()
    @IsEnum(
        DELIVERY_TYPE,
        {
            each: true,
            message: 'delivery type must be an array of DELIVERY_TYPE enum'
        }
    )
    type: DELIVERY_TYPE[];
    @IsOptional()
    @IsEnum(PRIORITY)
    priority: PRIORITY;
    @ArrayUnique()
    trackingHistory:{date:Date,description:string}[]

}

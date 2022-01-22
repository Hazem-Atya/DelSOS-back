import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class address {
  @IsString()
  city: string;
  @IsString()
  country: string;
  @IsString()
  postalCode: string;
  @IsString()
  address: string;
}

class subprop {
  @ApiProperty()
  city: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  postalCode: string;
  @ApiProperty()
  address: string;
}

export class CreateStoreDto {
  @ApiProperty({
    description: "The store's name",
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  readonly name: string;

  // Email
  @ApiProperty({
    example: 'store@gmail.com',
    description: 'The email of the store',
    format: 'email',
    uniqueItems: true,
    minLength: 5,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  @IsEmail()
  readonly email: string;
  // website
  @ApiProperty({
    example: 'www.websitename.com',
    description: 'The website of the store',
    format: 'Link',
    uniqueItems: true,
    minLength: 5,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  readonly website: string;
  // phone numer
  @ApiProperty({
    example: '93654872',
    description: 'The phone number of the store',
    minLength: 8,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  readonly phoneNumber: string;
  //description
  @ApiProperty({
    example: 'this is my store description',
    description: 'The description of the store',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly description: string;
  //address
  @ApiProperty({
    type: () => subprop,
    description: 'The address of the store',
    format: 'object',
  })
  @ValidateNested()
  @Type(() => address)
  readonly address: Object;
}

import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShopperDto {
  //name
  @ApiProperty({
    description: "The user's name",
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly name: string;

  @ApiProperty({
    description: "The user's age",
    format: 'string',
  })
  @IsNotEmpty()
  readonly age: number;

  @ApiProperty({
    description: "The user's address",
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly address: string;
  @ApiProperty({
    description: "The user's phone number ",
    format: 'Number',
  })
  @IsNotEmpty()
  @MinLength(8)
  readonly phoneNumber: string;

  // Email
  @ApiProperty({
    example: 'flen@gmail.com',
    description: 'The email of the User',
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

  // Password
  @ApiProperty({
    example: 'TIKTAK',
    description: 'The password of the User',
    format: 'string',
    minLength: 5,
    maxLength: 1024,
  })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
  readonly password: string;
  // bank card details

  @ApiProperty({
    description: "The name of the card's owner",
    format: 'string',
    minLength: 5,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  readonly owner: string;

  @ApiProperty({
    description: "the card's number ",
    format: 'string',
    minLength: 8,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  readonly cardNumber: string;

  @ApiProperty({
    description: 'The expiration date of the card ',
    format: 'date',
  })
  @IsNotEmpty()
  readonly expirationDate: string;
}

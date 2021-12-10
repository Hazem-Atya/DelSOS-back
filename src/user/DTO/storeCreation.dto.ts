import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

    // Password
    @ApiProperty({
      description: 'The password of the store',
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
  

  }
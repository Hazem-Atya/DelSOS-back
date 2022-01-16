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



  


  }
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'i am the new secret password',
    description: 'The new password of the User',
    format: 'string',
    minLength: 5,
    maxLength: 1024,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
  readonly newPassword: string;

  @ApiProperty({
    example: 'i am the new secret password',
    description: 'The confirmed new password of the User',
    format: 'string',
    minLength: 5,
    maxLength: 1024,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
  readonly confirmPassword: string;
}

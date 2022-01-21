import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class Password {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly currentPassword: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly confirmPassword: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly newPassword: string;
}
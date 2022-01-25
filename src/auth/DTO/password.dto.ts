import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class Password {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly oldPassword: string;

    @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly newPassword: string;


}

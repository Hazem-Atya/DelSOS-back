import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class Password{
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;
}
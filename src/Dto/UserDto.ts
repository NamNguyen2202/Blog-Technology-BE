import { IsString } from "class-validator";

export class SignUpDto {
  @IsString()
  userName: string;

  @IsString()
  phone: string;

  @IsString()
  password: string;
}

export class SignInDto {
  @IsString()
  userName: string;

  @IsString()
  password: string;
}


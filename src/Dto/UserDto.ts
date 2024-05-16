import { IsString } from 'class-validator';

export class UserDto {
  readonly userId: number;
  readonly userName: string;
  readonly phone: string;
  readonly password: string;
}

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
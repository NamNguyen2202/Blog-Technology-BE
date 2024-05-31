import { IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  userName: string;

  @IsString()
  currentPassword: string;

  @IsString()
  newPassword: string;
}

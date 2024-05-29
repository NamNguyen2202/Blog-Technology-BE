import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInDto, SignUpDto } from 'src/Dto/UserDto';
import { ChangePasswordDto } from 'src/Dto/ChangePasswordDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  GetUserId(@Param('userId') userId: number) {
    return this.userService.GetUserId(userId);
  }
  @Get()
  GetAllUserId() {
    return this.userService.GetAllUserId();
  }

  @Get('sign-up/:userName')
  CheckUserName(@Param('userName') userName: string) {
    return this.userService.CheckUserName(userName);
  }

  @Post('sign-up')
  async InsertUser(
    @Body() user: SignUpDto,
  ): Promise<{ success: boolean; userName?: string; message?: string }> {
    return this.userService.InsertUser(user);
  }

  @Post('sign-in')
  async checkSignIn(
    @Body() body: SignInDto,
  ): Promise<{ success: boolean; userName?: string; message?: string }> {
    return this.userService.checkSignIn(body.userName, body.password);
  }

  @Put('change-pass')
  async changePass(
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<{ success: boolean; message?: string }> {
    const { userId, currentPassword, newPassword } = changePasswordDto;
    return this.userService.changePass(userId, currentPassword, newPassword);
  }
}

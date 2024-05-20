import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInDto, SignUpDto } from 'src/Dto/UserDto';

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
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from 'src/Dto/UserDto';

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

  @Get('check/:userName')
  CheckUserName(@Param('userName') userName: string) {
    return this.userService.CheckUserName(userName);
  }

  @Post('check/:sign')
  InsertUser(@Body() user: SignUpDto): Promise<SignUpDto> {
    return this.userService.InsertUser(user);
  }

  @Post('sign-in')
  async checkSignIn(
    @Body() body: { username: string; password: string },
  ): Promise<{ isValid: boolean }> {
    const { username, password } = body;
    const isValid = await this.userService.CheckSignIn(username, password);
    return { isValid };
  }
}

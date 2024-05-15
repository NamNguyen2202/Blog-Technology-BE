import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/Dto/UserDto';

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

  @Get(':userName')
  CheckUserName(@Param('userName') userName: string) {
    return this.userService.CheckUserName(userName);
  }

  @Post()
  InsertUser(@Body() user: UserDto): Promise<UserDto> {
    return this.userService.InsertUser(user);
  }

  //   @Delete('/users/:id')
  //   DeleteUserId(@Param('userId') userId: number) {
  //     return this.userService.GetUserId(userId);
  //   }

  //   @Post('them')
  //   Insert() {
  //     return this.userService.Insert(9, 'HuyAA', 21);
  //   }

  //   @Post('themUser')
  //   InsertUser(@Body() user: UserDto): Promise<UserDto> {
  //     return this.userService.InsertUser(user);
  //   }
}

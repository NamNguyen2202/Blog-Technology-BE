import { Body, Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';
import { IPost } from 'src/interfaces/post.interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('id')
  async GetAllPostId(@Body() categoryId: number[]): Promise<IPost[]> {
    return this.postService.GetAllPostId(categoryId);
  }

  // @Get('id/:categoryId')
  // GetPostID(@Param('categoryIds') categoryIds: number) {
  //   return this.postService.GetPostID(categoryIds);
  // }

  @Get()
  GetAllPost() {
    return this.postService.GetAllPost();
  }
}

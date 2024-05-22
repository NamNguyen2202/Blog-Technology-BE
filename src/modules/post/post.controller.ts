import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('id/:categoryId')
  GetAllPostId(@Param('categoryId') categoryId: number) {
    return this.postService.GetAllPostId(categoryId);
  }

  @Get()
  GetAllPost() {
    return this.postService.GetAllPost();
  }
}

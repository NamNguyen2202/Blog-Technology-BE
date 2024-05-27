import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from './post.service';
import { IPost } from 'src/interfaces/post.interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // @Get('id/:id')
  // async GetAllPostId(@Param('id') id: number[]): Promise<IPost[]> {
  //   // const categoryIds = id.split(',').map(Number);
  //   console.log(id);
  //   return this.postService.GetAllPostId(id);
  // }

  @Get('ids/:categoryIds')
  async GetAllPostId(
    @Param('categoryIds') categoryIds: string,
  ): Promise<IPost[]> {
    const ids = categoryIds.split(',').map(Number);
    return this.postService.GetAllPostId(ids);
  }

  // @Get()
  // GetAllPost() {
  //   console.log(1);
  //   return this.postService.GetAllPost();
  // }
}

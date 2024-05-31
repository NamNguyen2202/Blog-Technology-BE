import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { IPost } from 'src/interfaces/post.interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('ids')
  async GetAllPostId(
    @Query('categoryIds') categoryIds: string,
  ): Promise<IPost[]> {
    let ids: number[] = [];
    if (categoryIds && categoryIds.trim() !== '') {
      ids = categoryIds.split(',').map(Number);
    }
    return this.postService.GetAllPostId(ids);
  }

  @Post('insertpost')
  async insertPost(
    @Body() post: IPost,
  ): Promise<{ success: boolean; message?: string }> {
    return this.postService.insertPost(post);
  }

  @Get('user/:userId')
  async getAllPostsForUser(@Param('userId') userId: number): Promise<IPost[]> {
    return this.postService.getAllPostsForUser(userId);
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { IComment } from 'src/interfaces/comment.interfafce';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('post/:postId')
  async getCommentsByPostId(
    @Param('postId') postId: number,
  ): Promise<IComment[]> {
    return this.commentService.getCommentsByPostId(postId);
  }

  @Post('add')
  async addComment(
    @Body() comment: IComment,
  ): Promise<{ success: boolean; message?: string }> {
    return this.commentService.addComment(comment);
  }
}

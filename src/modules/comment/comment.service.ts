// src/comment/comment.service.ts

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { IComment } from 'src/interfaces/comment.interfafce';
import { DataSource } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async getCommentsByPostId(postId: number): Promise<IComment[]> {
    try {
      const query = `
        SELECT * FROM "Comment"
        WHERE "postId" = $1
      `;
      const result = await this.dataSource.query(query, [postId]);
      return result;
    } catch (err) {
      console.error('Error executing query', err.stack);
      throw new Error('Database Error');
    }
  }

  async addComment(
    comment: IComment,
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const data = await this.dataSource.query(
        'INSERT INTO "Comment" ("postId", "userId", "contentComment") VALUES ($1, $2, $3) RETURNING "commentId"',
        [comment.postId, comment.userId, comment.contentComment],
      );
      if (data.length > 0) {
        return { success: true, message: 'Comment created successfully' };
      } else {
        return { success: false, message: 'Failed to create comment' };
      }
    } catch (error) {
      console.error('Error creating comment', error.stack);
      return { success: false, message: 'Error creating comment' };
    }
  }
}

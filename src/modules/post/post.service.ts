import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class PostService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}
  GetAllPostId(categoryId: number): Promise<string> {
    return this.dataSource.query(
      'SELECT "postId", "postName", "content", photo, "userId", "categoryId" FROM "Post" WHERE "categoryId" = $1',
      [categoryId],
    );
  }

  GetAllPost(): Promise<string> {
    return this.dataSource.query(
      'SELECT "postId", "postName", "content", photo, "userId", "categoryId" FROM "Post"',
    );
  }
}

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class PostService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}
  async GetAllPostId(categoryIds: number[]): Promise<any[]> {
    try {
      let result;
      if (categoryIds.length > 0) {
        // Nếu có categoryId, lọc bài viết theo danh sách categoryId
        const query = `
          SELECT "postId", "postName", "content", "photo", "userId", "categoryId"
          FROM "Post"
          WHERE "categoryId" = ANY($1::int[])
        `;
        result = await this.dataSource.query(query, [categoryIds]);
      } else if (!categoryIds || categoryIds.length === 0) {
        // Nếu không có categoryId, trả về toàn bộ bài viết
        const query = `
          SELECT p."postId", p."postName", p."content", p."photo", p."userId", c."categoryName" 
          FROM "Post" as p 
          JOIN "CategoryPost" as c 
          ON p."categoryId" = c."categoryId"
        `;
        result = await this.dataSource.query(query);
      }
      return result.rows;
    } catch (err) {
      console.error('Lỗi thực hiện truy vấn', err.stack);
      throw new Error('Lỗi Database');
    }
  }

  // GetAllPost(): Promise<string> {
  //   return this.dataSource.query(
  //     'SELECT p."postId", p."postName", p."content", p."photo", p."userId", c."categoryName" FROM "Post" as p JOIN "CategoryPost" as c ON p."categoryId" = c."categoryId"',
  //   );
  // }
}

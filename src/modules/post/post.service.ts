import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { IPost } from 'src/interfaces/post.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class PostService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}
  async GetAllPostId(categoryIds: number[]): Promise<IPost[]> {
    try {
      let result: IPost[] | PromiseLike<IPost[]>;
      if (categoryIds.length === 0) {
        console.log('Không có id nào:');
        const query = `
        SELECT p."postId", p."postName", p."content", p."photo", p."userId", c."categoryName"
        FROM "Post" as p
        JOIN "CategoryPost" as c
        ON p."categoryId" = c."categoryId"
        `;
        result = await this.dataSource.query(query);
      } else {
        console.log('Querying with categoryIds:', categoryIds);
        const query = `
        SELECT p."postId", p."postName", p."content", p."photo", p."userId", c."categoryName"
        FROM "Post" as p
        JOIN "CategoryPost" as c
        ON p."categoryId" = c."categoryId"
        WHERE p."categoryId" = ANY($1::int[])
        `;
        result = await this.dataSource.query(query, [categoryIds]);
      }
      return result;
    } catch (err) {
      console.error('Lỗi thực hiện truy vấn', err.stack);
      throw new Error('Lỗi Database');
    }
  }

  GetAllPost(): Promise<string> {
    return this.dataSource.query(
      'SELECT p."postId", p."postName", p."content", p."photo", p."userId", c."categoryName" FROM "Post" as p JOIN "CategoryPost" as c ON p."categoryId" = c."categoryId"',
    );
  }
}

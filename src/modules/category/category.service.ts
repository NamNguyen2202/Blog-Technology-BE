import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}
  GetAllCategory(): Promise<string> {
    return this.dataSource.query(
      'SELECT "categoryId", "categoryName" FROM "CategoryPost"',
    );
  }
}

import { IsString } from 'class-validator';
export class CategoryDto {
  @IsString()
  categoryId: number;

  @IsString()
  categoryName: string;
}

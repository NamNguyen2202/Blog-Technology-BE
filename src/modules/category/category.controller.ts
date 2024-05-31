import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  GetAllCategory() {
    return this.categoryService.GetAllCategory();
  }
  @Get('all')
  GetCategory() {
    return this.categoryService.GetCategory();
  }
}

export interface IPost {
  postId: number;
  postName: string;
  content: string;
  photo: string;
  userId: number;
  categoryId?: number;
  categoryName?: string; // Tùy chọn nếu không lấy tên danh mục
}

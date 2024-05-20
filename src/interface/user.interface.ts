export interface User {
  userId: number;
  userName: string;
  phone: string;
  password: string;
}

export interface SignUpResponse {
  success: boolean;
  userName?: string;
  message?: string;
}

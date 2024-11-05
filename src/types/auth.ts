export interface User {
  _id: string;
  email: string;
  nickname: string;
  introduce: string;
  profile_image: string;
  is_deleted: boolean;
  bookmark: any[];
  my_recipes: any[];
  my_comments: any[];
  likes: any[];
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface LoginUrlResponse {
  login_url: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: User | null;
}

export interface Comment {
  _id: string;
  content: string;
  created_at: string;
  updated_at: string;
  writer: {
    nickname: string;
    profile_image: string;
  };
}

export interface CommentsResponse {
  status: number;
  message: string;
  data: Comment[];
}

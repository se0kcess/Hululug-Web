import { RamenId } from '@/constants/ramenWorldCupList';

// API 응답 타입 정의
export interface RamenAPIResponse {
  status: string;
  message: string;
  data: {
    ramen: Array<{
      _id: RamenId;
      title: string;
      count: number; // 해당 라면의 우승 횟수
    }>;
    total_count: number; // 전체 라면의 우승 횟수 총합
  };
}

// 우승 업데이트 응답
export interface WinnerUpdateResponse {
  status: string;
  message: string;
}

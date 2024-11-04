import { RamenImageKey } from '@/types/ramenWorldCup';

import shinRamyun from '@/assets/ramyun-images/shin-ramyun.png';
import jinRamyun from '@/assets/ramyun-images/jin-ramyun.png';
import jjapaghetti from '@/assets/ramyun-images/jjapaghetti.png';
import buldakBokkemMyun from '@/assets/ramyun-images/buldak-bokkeum-myun.png';
import yukgaejang from '@/assets/ramyun-images/yukgaejang.png';
import ansungTangmyun from '@/assets/ramyun-images/ansung-tangmyun.png';
import neoguri from '@/assets/ramyun-images/neoguri.png';
import wangTtukkeong from '@/assets/ramyun-images/wang-ttukkeong.png';
import samyangRamyun from '@/assets/ramyun-images/samyang-ramyun.png';
import paldoBibim from '@/assets/ramyun-images/paldo-bibim.png';
import sesameRamyun from '@/assets/ramyun-images/sesame-ramyun.png';
import yeolRamyun from '@/assets/ramyun-images/yeol-ramyun.png';
import saewooTang from '@/assets/ramyun-images/saewoo-tang.png';
import teumsaeRamyun from '@/assets/ramyun-images/teumsae-ramyun.png';
import cupNoodle from '@/assets/ramyun-images/cup-noodle.png';
import ojingeoJjambbong from '@/assets/ramyun-images/ojingeo-jjambbong.png';

// 이미지 맵핑
export const RAMEN_IMAGES: Record<RamenImageKey, string> = {
  shin: shinRamyun,
  jjapaghetti: jjapaghetti,
  jin: jinRamyun,
  buldak: buldakBokkemMyun,
  yukgaejang: yukgaejang,
  ansung: ansungTangmyun,
  neoguri: neoguri,
  wangttukkeong: wangTtukkeong,
  samyang: samyangRamyun,
  bibim: paldoBibim,
  sesame: sesameRamyun,
  yeol: yeolRamyun,
  saewootang: saewooTang,
  teumsae: teumsaeRamyun,
  cupnoodle: cupNoodle,
  ojingeo: ojingeoJjambbong,
} as const;

// DB의 라면 ID와 이미지 키 매핑을 위한 상수
export const RAMEN_ID_MAP = {
  '6728603f2f3ce8010638df5': {
    title: '신라면',
    brand: 'Nongshim',
    imageKey: 'shin',
  },
  '6728605a2f3ce8010638df6': {
    title: '짜파게티',
    brand: 'Nongshim',
    imageKey: 'jjapaghetti',
  },
  '672860692f3ce8010638df7': {
    title: '진라면',
    brand: 'Ottogi',
    imageKey: 'jin',
  },
  '672860792f3ce8010638df9': {
    title: '불닭볶음면',
    brand: 'Samyang',
    imageKey: 'buldak',
  },
  '672860972f3ce8010638dfb': {
    title: '육개장',
    brand: 'Nongshim',
    imageKey: 'yukgaejang',
  },
  '672860a72f3ce8010638dfc': {
    title: '안성탕면',
    brand: 'Nongshim',
    imageKey: 'ansung',
  },
  '672860b52f3ce8010638dfd': {
    title: '너구리',
    brand: 'Nongshim',
    imageKey: 'neoguri',
  },
  '672860ca2f3ce8010638dfe': {
    title: '왕뚜껑',
    brand: 'Paldo',
    imageKey: 'wangttukkeong',
  },
  '672860da2f3ce8010638dff': {
    title: '삼양라면',
    brand: 'Samyang',
    imageKey: 'samyang',
  },
  '672860f02f3ce8010638e00': {
    title: '팔도비빔면',
    brand: 'Paldo',
    imageKey: 'bibim',
  },
  '6728610a2f3ce8010638e01': {
    title: '참깨라면',
    brand: 'Ottogi',
    imageKey: 'sesame',
  },
  '672861232f3ce8010638e02': {
    title: '열라면',
    brand: 'Ottogi',
    imageKey: 'yeol',
  },
  '6728612f2f3ce8010638e03': {
    title: '새우탕',
    brand: 'Nongshim',
    imageKey: 'saewootang',
  },
  '6728613b2f3ce8010638e04': {
    title: '틈새라면',
    brand: 'Ottogi',
    imageKey: 'teumsae',
  },
  '672861522f3ce8010638e05': {
    title: '컵누들',
    brand: 'Ottogi',
    imageKey: 'cupnoodle',
  },
  '672861602f3ce8010638e06': {
    title: '오징어짬뽕',
    brand: 'Nongshim',
    imageKey: 'ojingeo',
  },
} as const;

// 타입 정의
export type RamenId = keyof typeof RAMEN_ID_MAP;

// API 응답 타입
export interface RamenAPIResponse {
  status: string;
  message: string;
  data: {
    ramen: Array<{
      _id: RamenId;
      title: string;
      count: number;
    }>;
    total_count: number;
  };
}

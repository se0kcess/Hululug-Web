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

export const RAMEN_ID_MAP = {
  '6728603f2f3ce80106358df5': {
    title: '신라면',
    imageKey: 'shin',
  },
  '6728605a2f3ce80106358df6': {
    title: '짜파게티',
    imageKey: 'jjapaghetti',
  },
  '672860692f3ce80106358df7': {
    title: '진라면',
    imageKey: 'jin',
  },
  '672860792f3ce80106358df9': {
    title: '불닭볶음면',
    imageKey: 'buldak',
  },
  '672860972f3ce80106358dfb': {
    title: '육개장',
    imageKey: 'yukgaejang',
  },
  '672860a72f3ce80106358dfc': {
    title: '안성탕면',
    imageKey: 'ansung',
  },
  '672860b52f3ce80106358dfd': {
    title: '너구리',
    imageKey: 'neoguri',
  },
  '672860ca2f3ce80106358dfe': {
    title: '왕뚜껑',
    imageKey: 'wangttukkeong',
  },
  '672860da2f3ce80106358dff': {
    title: '삼양라면',
    imageKey: 'samyang',
  },
  '672860f02f3ce80106358e00': {
    title: '팔도비빔면',
    imageKey: 'bibim',
  },
  '6728610a2f3ce80106358e01': {
    title: '참깨라면',
    imageKey: 'sesame',
  },
  '672861232f3ce80106358e02': {
    title: '열라면',
    imageKey: 'yeol',
  },
  '6728612f2f3ce80106358e03': {
    title: '새우탕',
    imageKey: 'saewootang',
  },
  '6728613b2f3ce80106358e04': {
    title: '틈새라면',
    imageKey: 'teumsae',
  },
  '672861522f3ce80106358e05': {
    title: '컵누들',
    imageKey: 'cupnoodle',
  },
  '672861602f3ce80106358e06': {
    title: '오징어짬뽕',
    imageKey: 'ojingeo',
  },
} as const;

export type RamenId = keyof typeof RAMEN_ID_MAP;

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

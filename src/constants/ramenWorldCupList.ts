import { Ramen, RamenImageKey } from '@/types/ramenWorldCup';

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

// 초기 라면 데이터
export const INITIAL_RAMEN_LIST: Ramen[] = [
  {
    id: 'shin',
    name: '신라면',
    brand: 'Nongshim',
    imageKey: 'shin',
    winCount: 0,
  },
  {
    id: 'jjapaghetti',
    name: '짜파게티',
    brand: 'Nongshim',
    imageKey: 'jjapaghetti',
    winCount: 0,
  },
  {
    id: 'jin',
    name: '진라면',
    brand: 'Ottogi',
    imageKey: 'jin',
    winCount: 0,
  },
  {
    id: 'buldak',
    name: '불닭볶음면',
    brand: 'Samyang',
    imageKey: 'buldak',
    winCount: 0,
  },
  {
    id: 'yukgaejang',
    name: '육개장',
    brand: 'Nongshim',
    imageKey: 'yukgaejang',
    winCount: 0,
  },
  {
    id: 'ansung',
    name: '안성탕면',
    brand: 'Nongshim',
    imageKey: 'ansung',
    winCount: 0,
  },
  {
    id: 'neoguri',
    name: '너구리',
    brand: 'Nongshim',
    imageKey: 'neoguri',
    winCount: 0,
  },
  {
    id: 'wang',
    name: '왕뚜껑',
    brand: 'Paldo',
    imageKey: 'wangttukkeong',
    winCount: 0,
  },
  {
    id: 'samyang',
    name: '삼양라면',
    brand: 'Samyang',
    imageKey: 'samyang',
    winCount: 0,
  },
  {
    id: 'bibim',
    name: '팔도비빔면',
    brand: 'Paldo',
    imageKey: 'bibim',
    winCount: 0,
  },
  {
    id: 'sesame',
    name: '참깨라면',
    brand: 'Ottogi',
    imageKey: 'sesame',
    winCount: 0,
  },
  {
    id: 'yeol',
    name: '열라면',
    brand: 'Ottogi',
    imageKey: 'yeol',
    winCount: 0,
  },
  {
    id: 'saewoo',
    name: '새우탕',
    brand: 'Nongshim',
    imageKey: 'saewootang',
    winCount: 0,
  },
  {
    id: 'teumsae',
    name: '틈새라면',
    brand: 'Ottogi',
    imageKey: 'teumsae',
    winCount: 0,
  },
  {
    id: 'cupnoodle',
    name: '컵누들',
    brand: 'Ottogi',
    imageKey: 'cupnoodle',
    winCount: 0,
  },
  {
    id: 'ojingeo',
    name: '오징어짬뽕',
    brand: 'Nongshim',
    imageKey: 'ojingeo',
    winCount: 0,
  },
];

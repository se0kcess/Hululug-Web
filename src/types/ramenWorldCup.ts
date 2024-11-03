// 라면 이미지 키 리터럴 타입 정의
export type RamenImageKey =
  | 'shin'
  | 'jjapaghetti'
  | 'jin'
  | 'buldak'
  | 'yukgaejang'
  | 'ansung'
  | 'neoguri'
  | 'wangttukkeong'
  | 'samyang'
  | 'bibim'
  | 'sesame'
  | 'yeol'
  | 'saewootang'
  | 'teumsae'
  | 'cupnoodle'
  | 'ojingeo';

// 라면 브랜드 타입 정의
export type RamenBrand = 'Nongshim' | 'Ottogi' | 'Samyang' | 'Paldo';

// 라면 인터페이스 정의
export interface Ramen {
  id: string;
  name: string;
  brand: RamenBrand;
  imageKey: RamenImageKey;
  winCount: number;
}

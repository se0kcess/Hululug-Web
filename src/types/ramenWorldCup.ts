export interface Ramen {
  id: string;
  name: string;
  brand: string;
  imageKey: string;
  winCount: number;
}

export type RamenBrand = 'Nongshim' | 'Ottogi' | 'Samyang' | 'Paldo';

import { Ramen } from '@/types/ramenWorldCup';
import { create } from 'zustand';

interface RamenStore {
  ramenList: Ramen[];
  currentPair: [Ramen, Ramen] | null;
  currentRound: number;
  winners: Ramen[];
  winner: Ramen | null;

  shuffleRamenList: () => void;
  handleSelect: (ramenId: string) => boolean;
  getRanking: () => Ramen[];
}

export const useRamenStore = create<RamenStore>((set, get) => ({
  ramenList: [
    { id: 'shinramen', name: '신라면', brand: 'Nongshim', imageKey: 'shinramen', winCount: 0 },
    {
      id: 'jjapaghetti',
      name: '짜파게티',
      brand: 'Nongshim',
      imageKey: 'jjapaghetti',
      winCount: 0,
    },
    { id: 'jin', name: '진라면', brand: 'Ottogi', imageKey: 'jin', winCount: 0 },
    { id: 'buldak', name: '불닭볶음면', brand: 'Samyang', imageKey: 'buldak', winCount: 0 },
    { id: 'yukgaejang', name: '육개장', brand: 'Nongshim', imageKey: 'yukgaejang', winCount: 0 },
    { id: 'ansung', name: '안성탕면', brand: 'Nongshim', imageKey: 'ansung', winCount: 0 },
    { id: 'neoguri', name: '너구리', brand: 'Nongshim', imageKey: 'neoguri', winCount: 0 },
    { id: 'wang', name: '왕뚜껑', brand: 'Paldo', imageKey: 'wang', winCount: 0 },
    { id: 'samyang', name: '삼양라면', brand: 'Samyang', imageKey: 'samyang', winCount: 0 },
    { id: 'bibim', name: '팔도비빔면', brand: 'Paldo', imageKey: 'bibim', winCount: 0 },
    { id: 'sesame', name: '참깨라면', brand: 'Ottogi', imageKey: 'sesame', winCount: 0 },
    { id: 'yeol', name: '열라면', brand: 'Ottogi', imageKey: 'yeol', winCount: 0 },
    { id: 'saewoo', name: '새우탕', brand: 'Nongshim', imageKey: 'saewoo', winCount: 0 },
    { id: 'teumsae', name: '틈새라면', brand: 'Ottogi', imageKey: 'teumsae', winCount: 0 },
    { id: 'cupnoodle', name: '컵누들', brand: 'Ottogi', imageKey: 'cupnoodle', winCount: 0 },
    { id: 'ojingeo', name: '오징어짬뽕', brand: 'Nongshim', imageKey: 'ojingeo', winCount: 0 },
  ],
  currentPair: null,
  currentRound: 0,
  winners: [],
  winner: null,

  shuffleRamenList: () => {
    const { ramenList } = get();
    const shuffledList = [...ramenList].sort(() => Math.random() - 0.5);
    set({
      winners: shuffledList,
      currentPair: [shuffledList[0], shuffledList[1]],
      currentRound: 0,
      winner: null,
    });
  },

  handleSelect: (ramenId) => {
    const { winners, currentPair, currentRound } = get();

    // 승리 횟수 업데이트
    set((state) => ({
      ramenList: state.ramenList.map((ramen) =>
        ramen.id === ramenId ? { ...ramen, winCount: ramen.winCount + 1 } : ramen,
      ),
    }));

    const currentWinners = [...winners];
    const selectedRamen = currentPair!.find((r) => r.id === ramenId)!;
    currentWinners.push(selectedRamen);

    if (currentPair![1] === winners[winners.length - 1]) {
      const nextRound = currentRound + 1;

      if (currentWinners.length === 1) {
        set({ winner: selectedRamen });
        return true;
      } else {
        set({
          winners: currentWinners,
          currentPair: [currentWinners[0], currentWinners[1]],
          currentRound: nextRound,
        });
      }
    } else {
      const nextIndex = winners.indexOf(currentPair![1]) + 1;
      set({
        currentPair: [winners[nextIndex], winners[nextIndex + 1]],
      });
    }

    return false;
  },

  getRanking: () => {
    const { ramenList } = get();
    return [...ramenList].sort((a, b) => b.winCount - a.winCount);
  },
}));

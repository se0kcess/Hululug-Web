import { create } from 'zustand';
import { Ramen } from '@/types/ramenWorldCup';
import { INITIAL_RAMEN_LIST } from '@/constants/ramenWorldCupList';

interface RamenStore {
  ramenList: Ramen[];
  currentRound: number; // 현재 라운드 (16강: 0, 8강: 1, 4강: 2, 결승: 3)
  currentStageRamens: Ramen[]; // 현재 라운드에 참가하는 라면들
  nextStageRamens: Ramen[]; // 다음 라운드에 진출할 라면들
  currentMatchRamens: Ramen[]; // 현재 매치의 라면 2개
  currentMatchNumber: number; // 현재 매치 번호
  winner: Ramen | null; // 최종 우승 라면

  shuffleRamenList: () => void;
  handleSelect: (ramenId: string) => boolean;
  getRanking: () => Ramen[];
}

export const useRamenStore = create<RamenStore>((set, get) => ({
  ramenList: INITIAL_RAMEN_LIST,
  currentRound: 0,
  currentStageRamens: [],
  nextStageRamens: [],
  currentMatchRamens: [],
  currentMatchNumber: 0,
  winner: null,

  shuffleRamenList: () => {
    const shuffledList = [...INITIAL_RAMEN_LIST].sort(() => Math.random() - 0.5);

    set({
      ramenList: INITIAL_RAMEN_LIST,
      currentRound: 0,
      currentStageRamens: shuffledList,
      nextStageRamens: [],
      currentMatchRamens: shuffledList.slice(0, 2),
      currentMatchNumber: 1,
      winner: null,
    });
  },

  handleSelect: (ramenId) => {
    const state = get();
    const { currentRound, currentStageRamens, nextStageRamens, currentMatchNumber } = state;

    // 선택된 라면 찾기
    const selectedRamen = currentStageRamens.find((ramen) => ramen.id === ramenId);
    if (!selectedRamen) return false;

    // 승리 횟수 업데이트
    set((state) => ({
      ramenList: state.ramenList.map((ramen) =>
        ramen.id === ramenId ? { ...ramen, winCount: ramen.winCount + 1 } : ramen,
      ),
    }));

    // 다음 라운드 진출자 목록에 추가
    const updatedNextStage = [...nextStageRamens, selectedRamen];

    // 현재 스테이지의 다음 매치 계산
    const nextMatchIndex = currentMatchNumber * 2;
    const remainingRamens = currentStageRamens.slice(nextMatchIndex, nextMatchIndex + 2);

    // 현재 라운드의 모든 매치가 종료되었는지 확인
    const isCurrentStageComplete = nextMatchIndex >= currentStageRamens.length - 1;

    if (isCurrentStageComplete) {
      // 결승전이 끝난 경우
      if (currentRound === 3) {
        set({
          winner: selectedRamen,
        });
        return true;
      }

      // 다음 라운드 시작
      set({
        currentRound: currentRound + 1,
        currentStageRamens: updatedNextStage,
        nextStageRamens: [],
        currentMatchRamens: updatedNextStage.slice(0, 2),
        currentMatchNumber: 1,
      });
    } else {
      // 현재 라운드 계속 진행
      set({
        nextStageRamens: updatedNextStage,
        currentMatchRamens: remainingRamens,
        currentMatchNumber: currentMatchNumber + 1,
      });
    }

    return false;
  },

  getRanking: () => {
    const { ramenList } = get();
    return [...ramenList].sort((a, b) => b.winCount - a.winCount);
  },
}));

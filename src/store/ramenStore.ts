import { create } from 'zustand';
import { RAMEN_ID_MAP, RAMEN_IMAGES, RamenId } from '@/constants/ramenWorldCupList';

interface RamenInfo {
  _id: RamenId;
  title: string;
  imageKey: keyof typeof RAMEN_IMAGES;
  count: number;
}

interface RamenStore {
  ramenList: RamenInfo[]; // ramenList 추가
  currentRound: number;
  currentStageRamens: RamenInfo[];
  nextStageRamens: RamenInfo[];
  currentMatchRamens: RamenInfo[];
  currentMatchNumber: number;
  winner: RamenInfo | null;

  initializeRamenList: (
    apiRamenList: Array<{ _id: RamenId; title: string; count: number }>,
  ) => void;
  handleSelect: (ramenId: RamenId) => boolean;
}

export const useRamenStore = create<RamenStore>((set, get) => ({
  ramenList: [],
  currentRound: 0,
  currentStageRamens: [],
  nextStageRamens: [],
  currentMatchRamens: [],
  currentMatchNumber: 0,
  winner: null,

  initializeRamenList: (apiRamenList) => {
    // API 응답의 라면 데이터에 이미지 키를 매핑
    const ramenList = apiRamenList.map((ramen) => ({
      ...ramen,
      imageKey: RAMEN_ID_MAP[ramen._id].imageKey,
    }));

    const shuffledList = [...ramenList].sort(() => Math.random() - 0.5);

    set({
      ramenList,
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
    const selectedRamen = currentStageRamens.find((ramen) => ramen._id === ramenId);
    if (!selectedRamen) return false;

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
}));

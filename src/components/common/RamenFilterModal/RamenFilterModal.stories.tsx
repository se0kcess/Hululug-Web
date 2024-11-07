import type { Meta, StoryObj } from '@storybook/react';
import { RamenFilterModal } from './RamenFilterModal';
import { useRamenFilterStore } from '@/store/filterStore';
import { ThemeProvider } from '@emotion/react';
import { useState, useEffect } from 'react';
import theme from '@/styles/theme';

const meta: Meta<typeof RamenFilterModal> = {
  title: 'Components/common/RamenFilterModal',
  component: RamenFilterModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '라면 종류를 선택할 수 있는 바텀 시트 모달 컴포넌트입니다. 전체 선택 옵션을 포함하여 그룹화된 레이아웃으로 표시됩니다.',
      },
    },
    viewport: {
      viewports: {
        mobile1: {
          name: 'Mobile',
          styles: {
            width: '360px',
            height: '640px',
          },
        },
        mobile2: {
          name: 'Mobile (Large)',
          styles: {
            width: '414px',
            height: '896px',
          },
        },
      },
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    (Story) => {
      useEffect(() => {
        return () => {
          useRamenFilterStore.getState().clearRamen();
        };
      }, []);

      return (
        <ThemeProvider theme={theme}>
          <div style={{ height: '100vh', background: '#f5f5f5' }}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof RamenFilterModal>;

// 모달 제어를 위한 컨테이너 컴포넌트
const ModalContainer = ({
  defaultOpen = false,
  defaultSelected = null,
}: {
  defaultOpen?: boolean;
  defaultSelected?: { id: number; name: string } | null;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const setRamen = useRamenFilterStore((state) => state.setRamen);
  const selectedRamen = useRamenFilterStore((state) => state.selectedRamen);

  useEffect(() => {
    if (defaultSelected) {
      setRamen(defaultSelected);
    }
  }, [defaultSelected, setRamen]);

  return (
    <div style={{ padding: '20px' }}>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '10px 20px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          background: 'white',
        }}
      >
        {selectedRamen ? `선택된 라면: ${selectedRamen.name}` : '라면 선택하기'}
      </button>
      <RamenFilterModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

// 기본 상태
export const Default: Story = {
  render: () => <ModalContainer defaultOpen={true} />,
};

// 라면 선택 상태
export const Selected: Story = {
  render: () => <ModalContainer defaultOpen={true} defaultSelected={{ id: 12, name: '신라면' }} />,
};

// 큰 화면
export const LargeScreen: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  render: () => <ModalContainer defaultOpen={true} />,
};

import type { Meta, StoryObj } from '@storybook/react';
import { RamenFilterModal } from './RamenFilterModal';
import { ThemeProvider } from '@emotion/react';
import { useEffect, useState } from 'react';
import theme from '@/styles/theme';
import tagMapping from '@/constants/ramenTagMapping';

const meta: Meta<typeof RamenFilterModal> = {
  title: 'Components/MainPage/RamenFilterModal',
  component: RamenFilterModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '라면 종류를 선택할 수 있는 바텀 시트 모달입니다.',
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
    (Story) => (
      <ThemeProvider theme={theme}>
        <div style={{ height: '100vh', background: '#f5f5f5' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달의 열림/닫힘 상태',
    },
    selectedTagId: {
      control: 'select',
      options: [undefined, ...Object.keys(tagMapping)],
      description: '선택된 라면 태그 ID',
    },
    onClose: {
      action: 'closed',
      description: '모달이 닫힐 때 호출되는 함수',
    },
    onSelect: {
      action: 'selected',
      description: '태그가 선택될 때 호출되는 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RamenFilterModal>;

// 모달 제어를 위한 컨테이너 컴포넌트
const ModalContainer = ({
  defaultOpen = false,
  initialTagId,
}: {
  defaultOpen?: boolean;
  initialTagId?: string;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [selectedTagId, setSelectedTagId] = useState<string | undefined>(initialTagId);

  // ESC 키 이벤트 핸들러
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscKey);
      return () => window.removeEventListener('keydown', handleEscKey);
    }
  }, [isOpen]);

  return (
    <div style={{ padding: '20px' }}>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '10px 20px',
          borderRadius: '20px',
          border: '1px solid #ddd',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
        }}
      >
        <span>라면 종류: {selectedTagId ? tagMapping[selectedTagId] : '전체'}</span>
      </button>

      <RamenFilterModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedTagId={selectedTagId}
        onSelect={(tagId) => {
          setSelectedTagId(tagId);
          console.log('Selected tag:', tagId);
        }}
      />
    </div>
  );
};

// 기본 상태 (닫힌 상태)
export const Default: Story = {
  render: () => <ModalContainer />,
};

// 열린 상태
export const OpenState: Story = {
  render: () => <ModalContainer defaultOpen={true} />,
};

// 태그가 선택된 상태
export const WithSelectedTag: Story = {
  render: () => (
    <ModalContainer
      defaultOpen={true}
      initialTagId="6721a9eb7e7f8b4e11d49d46" // 신라면 ID
    />
  ),
};

// 모바일 뷰
export const MobileView: Story = {
  render: () => <ModalContainer defaultOpen={true} />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// 인터랙션 데모
export const InteractionDemo = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState<string | undefined>();

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <strong>현재 선택된 라면:</strong> {selectedTag ? tagMapping[selectedTag] : '전체'}
        </div>

        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: '10px 20px',
            borderRadius: '20px',
            border: '1px solid #ddd',
            background: 'white',
            cursor: 'pointer',
          }}
        >
          라면 선택하기
        </button>

        <RamenFilterModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          selectedTagId={selectedTag}
          onSelect={(tagId) => {
            setSelectedTag(tagId);
            setIsOpen(false);
          }}
        />
      </div>
    );
  },
};

// 접근성 테스트를 위한 스토리
export const AccessibilityTest: Story = {
  render: () => <ModalContainer defaultOpen={true} />,
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'button-name',
            enabled: true,
          },
        ],
      },
    },
  },
};

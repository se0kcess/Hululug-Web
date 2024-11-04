import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import RamenTypeSelect from './RamenTypeSelect';

export default {
  title: 'Components/RamenTypeSelect',
  component: RamenTypeSelect,
  argTypes: {
    onSelect: { action: 'selected' },
    onDisSelect: { action: 'deselected' },
  },
} as Meta<typeof RamenTypeSelect>;

const Template: StoryFn = (args) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    setSelected(true);
    args.onSelect();
  };

  const handleDeselect = () => {
    setSelected(false);
    args.onDisSelect();
  };

  return (
    <div>
      <RamenTypeSelect onSelect={handleSelect} onDisSelect={handleDeselect} />
      <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
        {selected ? '라면 종류가 선택되었습니다.' : '라면 종류가 선택되지 않았습니다.'}
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

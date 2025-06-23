import { useState } from 'react';
import styled from 'styled-components';
import Autocomplete, { SelectedItem } from 'components/Autocomplete';

const MockCustomItem = styled.li`
  background: lightblue;

  &:hover {
    border: 1px solid blue;
  }
`;

export default function App() {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  console.log({ selectedItems });

  return (
    <div>
      <Autocomplete
        label="My label"
        limit={2}
        doHideSelectedFromList
        onSelectionChange={(selectedItems) => setSelectedItems(selectedItems)}
        items={[
          {
            id: 'a',
            displayedContent: <div>abcd</div>,
            searchableText: 'abcd',
          },
          {
            id: 'b',
            displayedContent: <div>defg</div>,
            searchableText: 'defg',
          },
          {
            id: 'c',
            displayedContent: <div>Ghij</div>,
            searchableText: 'Ghij',
          },
        ]}
        styledComponents={{
          UnselectedItem: MockCustomItem,
        }}
      />
    </div>
  );
}

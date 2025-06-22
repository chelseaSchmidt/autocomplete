import styled from 'styled-components';
import Autocomplete from 'components/Autocomplete';

const MockCustomItem = styled.li`
  background: lightblue;

  &:hover {
    border: 1px solid blue;
  }
`;

export default function App() {
  return (
    <div>
      <Autocomplete
        label="My label"
        limit={2}
        doHideSelectedFromList
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

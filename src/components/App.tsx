import Autocomplete from 'components/Autocomplete';

export default function App() {
  return (
    <div>
      <Autocomplete
        label="My label"
        labelText="My label"
        placeholder="Select"
        limit={3}
        onSelectionChange={console.log}
        items={[
          {
            id: 'a',
            displayedContent: 'Joe',
            searchableText: 'Joe',
            data: { test: 1 },
          },
          {
            id: 'b',
            displayedContent: <div>Jane</div>,
            searchableText: 'Jane',
            data: { test: 2 },
          },
          {
            id: 'c',
            displayedContent: <div>Anna</div>,
            searchableText: 'Anna',
            data: { test: 3 },
          },
          {
            id: 'd',
            displayedContent: <div>Kyle</div>,
            searchableText: 'Kyle',
            data: { test: 4 },
          },
        ]}
        // shouldHideSelected
        // noItemsText=""
        // disabledItemStyle={}
        // selectedItemStyle={}
        // deleteIconLineStyle={}
        // deleteIconSize={}
        // listboxMargins={}
        // styledComponents={}
      />
    </div>
  );
}

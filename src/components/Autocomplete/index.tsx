import { useEffect, useState } from 'react';
import { NonEmptyString } from 'src/types';
import Button, { StyledButton } from './Button';
import ListItem, { Item, PublicSelectedItem, SelectedItem, UnselectedItem } from './ListItem';
import {
  Container,
  Input,
  InputWrapper,
  InteractiveElements,
  InvisibleOverlay,
  Label,
  List,
  SelectedInputPill,
  SelectedInputsArea,
} from './styledComponents';

type SelectedItems = { [key: string]: PublicSelectedItem | null };

export type SelectedItem = PublicSelectedItem;

interface Props<L extends string, O extends string> {
  label: NonEmptyString<L>;
  items: Item<O>[];
  limit: number;
  doHideSelectedFromList?: boolean;
  styledComponents?: {
    Container?: typeof Container;
    Label?: typeof Label;
    Input?: typeof Input;
    InputWrapper?: typeof InputWrapper;
    SelectedInputPill?: typeof SelectedInputPill;
    PillDeleteButton?: typeof StyledButton;
    ResetButton?: typeof StyledButton;
    List?: typeof List;
    UnselectedItem?: typeof UnselectedItem;
    SelectedItem?: typeof SelectedItem;
  };
  onSelectionChange: (selectedItems: PublicSelectedItem[]) => void;
}

export default function Autocomplete<L extends string, O extends string>({
  label,
  items,
  limit,
  doHideSelectedFromList = false,
  styledComponents = {},
  onSelectionChange,
}: Props<L, O>) {
  const [inputValue, setInputValue] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});

  const LABEL_ID = `label-${label}`;
  const COMBOBOX_ID = `combobox-${label}`;
  const LISTBOX_ID = `listbox-${label}`;

  useEffect(() => {
    onSelectionChange(Object.values(selectedItems).filter((item) => !!item));
  }, [selectedItems]);

  return (
    <Container as={styledComponents.Container}>
      {expanded && (
        <InvisibleOverlay
          onClick={() => {
            setExpanded(false);
            setInputValue('');
          }}
        />
      )}

      <Label as={styledComponents.Label} id={LABEL_ID} htmlFor={COMBOBOX_ID}>
        {label}
      </Label>

      <InteractiveElements>
        <InputWrapper as={styledComponents.InputWrapper}>
          <SelectedInputsArea>
            {Object.values(selectedItems)
              .filter((item) => !!item)
              .map((item) => (
                <SelectedInputPill key={item.id} as={styledComponents.SelectedInputPill}>
                  {item.displayedContent}
                  <Button
                    styledContainer={styledComponents.PillDeleteButton}
                    onClick={() => setSelectedItems({ ...selectedItems, [item.id]: null })}
                  >
                    X
                  </Button>
                </SelectedInputPill>
              ))}
          </SelectedInputsArea>

          <Input
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-haspopup="listbox"
            as={styledComponents.Input}
            id={COMBOBOX_ID}
            aria-controls={LISTBOX_ID}
            aria-expanded={expanded}
            placeholder={label}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setExpanded(true)}
          />

          <Button
            styledContainer={styledComponents.ResetButton}
            onClick={() => setSelectedItems({})}
            disabled={!countSelections(selectedItems)}
          >
            X
          </Button>
        </InputWrapper>

        <List
          role="listbox"
          as={styledComponents.List}
          id={LISTBOX_ID}
          aria-labelledby={LABEL_ID}
          style={{ display: expanded ? undefined : 'none' }}
        >
          {filterItems(items, inputValue, {
            doIncludeSelected: !doHideSelectedFromList,
            selectedItems,
          }).map((item) => (
            <ListItem
              key={item.id}
              item={item}
              isSelected={!!selectedItems[item.id]}
              disabled={!selectedItems[item.id] && countSelections(selectedItems) >= limit}
              styledComponents={styledComponents}
              select={(item) => {
                if (selectedItems[item.id]) {
                  setSelectedItems({ ...selectedItems, [item.id]: null });
                } else {
                  setSelectedItems({ ...selectedItems, [item.id]: item });
                  setInputValue('');
                }
              }}
            >
              {item.displayedContent}
            </ListItem>
          ))}
        </List>
      </InteractiveElements>
    </Container>
  );
}

type FilteringOptions = {
  doIncludeSelected?: boolean;
  selectedItems?: SelectedItems;
};

function filterItems<O extends string>(
  items: Item<O>[],
  searchedText: string,
  { doIncludeSelected = true, selectedItems = {} }: FilteringOptions = {},
) {
  return items.filter(
    (item) =>
      item.searchableText.trim().toLowerCase().includes(searchedText.trim().toLowerCase()) &&
      (doIncludeSelected || !selectedItems[item.id]),
  );
}

function countSelections(selectedItems: SelectedItems): number {
  return Object.values(selectedItems).reduce((sum, item) => {
    return item ? sum + 1 : sum;
  }, 0);
}

import { useState } from 'react';
import { NonEmptyString } from 'src/types';
import Button, { StyledButton } from './Button';
import ListItem, { Item, SelectedItem, UnselectedItem } from './ListItem';
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

type SelectedItems<O extends string> = { [key: string]: Item<O> | null };

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
}

export default function Autocomplete<L extends string, O extends string>({
  label,
  items,
  limit,
  doHideSelectedFromList = false,
  styledComponents = {},
}: Props<L, O>) {
  const [inputValue, setInputValue] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [selectedItems, setSelectedItems] = useState<SelectedItems<O>>({});

  const LABEL_ID = `label-${label}`;
  const COMBOBOX_ID = `combobox-${label}`;
  const LISTBOX_ID = `listbox-${label}`;

  return (
    <Container as={styledComponents.Container}>
      {expanded && <InvisibleOverlay onClick={() => setExpanded(false)} />}

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
              select={(item) =>
                setSelectedItems(
                  selectedItems[item.id]
                    ? { ...selectedItems, [item.id]: null }
                    : { ...selectedItems, [item.id]: item },
                )
              }
            >
              {item.displayedContent}
            </ListItem>
          ))}
        </List>
      </InteractiveElements>
    </Container>
  );
}

type FilteringOptions<O extends string> = {
  doIncludeSelected?: boolean;
  selectedItems?: SelectedItems<O>;
};

function filterItems<O extends string>(
  items: Item<O>[],
  searchedText: string,
  { doIncludeSelected = true, selectedItems = {} }: FilteringOptions<O> = {},
) {
  return items.filter(
    (item) =>
      item.searchableText.trim().toLowerCase().includes(searchedText.trim().toLowerCase()) &&
      (doIncludeSelected || !selectedItems[item.id]),
  );
}

function countSelections<O extends string>(selectedItems: SelectedItems<O>): number {
  return Object.values(selectedItems).reduce((sum, item) => {
    return item ? sum + 1 : sum;
  }, 0);
}

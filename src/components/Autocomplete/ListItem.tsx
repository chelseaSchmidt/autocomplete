import { ReactNode } from 'react';
import styled from 'styled-components';
import { NonEmptyString } from 'src/types';

export const UnselectedItem = styled.li`
  cursor: pointer;

  &:hover {
    background: #ddd;
  }

  &[aria-disabled='true'] {
    cursor: not-allowed;
    background: #ccc;
    color: #999;
  }
`;

export const SelectedItem = styled(UnselectedItem)`
  cursor: pointer;
  background: lightyellow;
  color: orange;

  &:hover {
    background: yellow;
  }
`;

export interface ItemProps {
  displayedContent: ReactNode;
  searchableText: string;
}

export type Item<T extends string> = ItemProps & {
  id: NonEmptyString<T>;
};

export type PublicSelectedItem = ItemProps & {
  id: string;
};

export interface ListItemProps<T extends string> {
  children: ReactNode;
  item: Item<T>;
  isSelected: boolean;
  disabled: boolean;
  styledComponents?: {
    UnselectedItem?: typeof UnselectedItem;
    SelectedItem?: typeof SelectedItem;
  };
  select: (item: PublicSelectedItem) => void;
}

export default function ListItem<T extends string>({
  children,
  item,
  isSelected,
  disabled,
  styledComponents = {},
  select,
}: ListItemProps<T>) {
  const Container = isSelected ? SelectedItem : UnselectedItem;

  return (
    <Container
      role="option"
      id={item.id}
      aria-disabled={disabled}
      onClick={disabled ? undefined : () => select(item)}
      as={isSelected ? styledComponents.SelectedItem : styledComponents.UnselectedItem}
    >
      {children}
    </Container>
  );
}

import React, { ChangeEvent, ReactElement, useRef, useState } from 'react';
import { ControlledMenu, MenuItem } from '@szhsin/react-menu';
import { Portal } from '../../Atoms/Portal';

import styles from './SearchBar.module.scss';

export interface ISearchBarProps {
  onSearch: (searchTerm: string) => Promise<Array<ReactElement>>;
  placeholder: string;
  searchingIndicator?: ReactElement;
  dataTestId?: string;
}

const SearchBar = (props: ISearchBarProps): ReactElement => {
  const { dataTestId, onSearch, placeholder, searchingIndicator } = props;

  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState<Array<ReactElement>>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const skipOpen = useRef(false);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim() === '') {
      closeMenu();
      setResult(undefined);
      return;
    }

    setSearching(true);
    onSearch(event.target.value)
      .then((response) => {
        setResult(response);
        openMenu();
      })
      .catch()
      .finally(() => {
        setSearching(false);
      });
  };

  return (
    <>
      <div className={styles.container} ref={ref}>
        <input
          autoComplete='off'
          className={styles.search}
          data-testid={dataTestId}
          onChange={handleChange}
          placeholder={placeholder}
          type='text'
        />
      </div>
      <Portal>
        <ControlledMenu
          align='center'
          anchorRef={ref}
          arrow
          captureFocus={false}
          onClose={closeMenu}
          skipOpen={skipOpen}
          state={isOpen ? 'open' : 'closed'}>
          {searching
            ? searchingIndicator
            : result?.map((resultItem, index) => {
                return <MenuItem key={`result-${index}`}>{resultItem}</MenuItem>;
              })}
        </ControlledMenu>
      </Portal>
    </>
  );
};

export default SearchBar;

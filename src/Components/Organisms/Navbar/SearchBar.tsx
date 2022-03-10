import { ControlledMenu, MenuItem } from '@szhsin/react-menu';
import React, { ChangeEvent, ReactElement, useRef, useState } from 'react';
import { Portal } from '../../Atoms/Portal';

export interface ISearchBarProps {
  onSearch: (searchTerm: string) => Promise<Array<ReactElement>>;
  placeholder: string;
  searchingIndicator?: ReactElement;
}

const SearchBar = (props: ISearchBarProps): ReactElement => {
  const { onSearch, placeholder, searchingIndicator } = props;

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
      <div className='nav-bar-menu-item nav-bar-search-container' ref={ref}>
        <input
          type='text'
          placeholder={placeholder}
          className='nav-bar-search'
          onChange={handleChange}
          autoComplete='false'
        />
      </div>
      <Portal>
        <ControlledMenu
          state={isOpen ? 'open' : 'closed'}
          align='center'
          arrow
          anchorRef={ref}
          skipOpen={skipOpen}
          onClose={closeMenu}
          captureFocus={false}>
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

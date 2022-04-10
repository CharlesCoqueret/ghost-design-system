import React, { useEffect, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';

import { IFilterFieldsProps, IFilterLayoutAndFieldsProps } from './types';
import FilterItem from './FilterItem';
import { Button, ColorButtonEnum } from '../../Molecules';
import { Container, Row } from '../../Atoms/Layout';
import { Modal, ModalBody, ModalFooter } from '../../Atoms/Modal';

export interface IFilterProps<T> {
  /** List of filter items shown in advanced search*/
  advancedSearchItems: Array<IFilterLayoutAndFieldsProps<T>>;
  /** Initial filter values (optional, default: undefined) */
  initialValues?: Partial<T>;
  localization: {
    /** Label of the button opening the advanced search modal (optional, default: 'Advanced search') */
    advancedSearch: string;
    /** Label of the advanced search modal (optional, default: 'Advanced search') */
    advancedSearchTitle: string;
    /** Label of the button running the search in the advanced search modal (optional, default: 'Search') */
    search: string;
    /** Label of the button resetting the form in the advanced search modal (optional, default: 'Reset') */
    reset: string;
  };
  /** Changes handler called when user changes a value in the search bar or presses the search button in the modal */
  onChange: (value: Partial<T> | undefined) => void;
  /** List of filter items shown in search bar*/
  searchBarItems: Array<IFilterFieldsProps<T>>;
}

/**
 * Filter
 */
const Filter = <T,>(props: IFilterProps<T>): React.ReactElement => {
  const { advancedSearchItems, initialValues, localization, onChange, searchBarItems } = props;

  const [currentSearchBarValues, setSearchBarCurrentValues] = useState<Partial<T> | undefined>(
    cloneDeep(initialValues),
  );
  const [currentModalValues, setCurrentModalValues] = useState<Partial<T> | undefined>(cloneDeep(initialValues));
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState<boolean>(false);

  const onChangeFilterValue = (filterName: keyof T, values: T[keyof T] | undefined): void => {
    setSearchBarCurrentValues((prev) => {
      return { ...prev, [filterName]: values };
    });
  };

  const onChangeAdvancedFilterValue = (filterName: keyof T, values: T[keyof T] | undefined): void => {
    setCurrentModalValues((prev) => {
      return { ...prev, [filterName]: values };
    });
  };
  const handleAdvancedFilterReset = (): void => {
    setCurrentModalValues(cloneDeep(cloneDeep(initialValues)));
  };

  const handleReset = (): void => {
    setSearchBarCurrentValues(cloneDeep(initialValues));
  };

  /** Handle open of advanced search modal*/
  const handleOpenAdvancedSearch = (): void => {
    setCurrentModalValues(cloneDeep(currentSearchBarValues));
    setAdvancedSearchOpen(true);
  };

  /** Handle close of advanced search modal*/
  const handleCloseAdvancedSearch = (): void => {
    setAdvancedSearchOpen(false);
  };

  const handleSubmitSearch = (): void => {
    handleCloseAdvancedSearch();
    setSearchBarCurrentValues(cloneDeep(currentModalValues));
  };

  /** Call onChange any time the currentSearchBarValues changes */
  useEffect(() => {
    onChange(currentSearchBarValues);
  }, [currentSearchBarValues]);

  const hasAdvancedSearch = advancedSearchItems && advancedSearchItems.length > 0;

  if (searchBarItems.length === 0) return <></>;

  return (
    <div className='filter-container'>
      <div className='searchbar'>
        <div className='search-field'>
          {searchBarItems.map((item) => {
            return (
              <FilterItem<T>
                key={item.dataIndex.toString()}
                inputValues={currentSearchBarValues}
                item={item}
                inline
                onChange={onChangeFilterValue}
              />
            );
          })}
        </div>
        <div className='search-actions'>
          <Button label={localization.reset} onClick={handleReset} />
          {hasAdvancedSearch && (
            <Button
              label={localization.advancedSearch}
              color={ColorButtonEnum.PRIMARY}
              onClick={handleOpenAdvancedSearch}
            />
          )}
        </div>
      </div>
      <Modal
        closeOnPressEscape
        closeOnClickOutside
        closeIcon
        show={advancedSearchOpen}
        onHide={handleCloseAdvancedSearch}
        title={localization.advancedSearchTitle}
        size={'lg'}>
        <ModalBody>
          <Container>
            <Row>
              {advancedSearchItems.map((item, index) => {
                return (
                  <FilterItem<T>
                    key={'dataIndex' in item ? item.dataIndex.toString() : `section-${index}`}
                    inputValues={currentModalValues}
                    item={item}
                    onChange={onChangeAdvancedFilterValue}
                  />
                );
              })}
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button label={localization.reset} onClick={handleAdvancedFilterReset} />
          <Button label={localization.search} color={ColorButtonEnum.PRIMARY} onClick={handleSubmitSearch} />
        </ModalFooter>
      </Modal>
    </div>
  );
};

Filter.defaultProps = {
  advancedSearchItems: [],
  initialValues: undefined,
  onChange: () => {
    return;
  },
  localization: {
    advancedSearch: 'Advanced search',
    advancedSearchTitle: 'Advanced search',
    search: 'Search',
    reset: 'Reset',
  },
  searchBarItems: [],
};

export default Filter;

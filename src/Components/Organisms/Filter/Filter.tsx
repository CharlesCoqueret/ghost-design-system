import React, { useCallback, useEffect, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';

import { Row } from '../../Atoms/Layout';
import { Modal, ModalBody, ModalFooter } from '../../Atoms/Modal';
import { Button, ColorButtonEnum } from '../../Molecules/Button';
import { IFilterFieldsProps, IFilterLayoutAndFieldsProps } from './types';
import FilterItem from './FilterItem';

import styles from './Filter.module.scss';

export interface IFilterProps<T> {
  /** List of filter items shown in advanced search (optional, default: undefined) */
  advancedSearchItems?: Array<IFilterLayoutAndFieldsProps<T>>;
  /** For test purpose only */
  dataTestId?: string;
  /** Disable tabbing outside modal (optional, default: true) */
  disableTabOutside?: boolean;
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
  const { advancedSearchItems, dataTestId, disableTabOutside, initialValues, localization, onChange, searchBarItems } =
    props;

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

  const handleAdvancedFilterReset = useCallback((): void => {
    setCurrentModalValues(cloneDeep(initialValues));
  }, [initialValues]);

  const handleReset = useCallback((): void => {
    setSearchBarCurrentValues(cloneDeep(initialValues));
  }, [initialValues]);

  /** Handle open of advanced search modal*/
  const handleOpenAdvancedSearch = useCallback((): void => {
    setCurrentModalValues(cloneDeep(currentSearchBarValues));
    setAdvancedSearchOpen(true);
  }, [currentSearchBarValues]);

  /** Handle close of advanced search modal*/
  const handleCloseAdvancedSearch = useCallback((): void => {
    setAdvancedSearchOpen(false);
  }, []);

  const handleSubmitSearch = useCallback((): void => {
    handleCloseAdvancedSearch();
    setSearchBarCurrentValues(cloneDeep(currentModalValues));
  }, [currentModalValues, handleCloseAdvancedSearch]);

  /** Call onChange any time the currentSearchBarValues changes */
  useEffect(() => {
    onChange(currentSearchBarValues);
  }, [currentSearchBarValues, onChange]);

  const hasAdvancedSearch = advancedSearchItems && advancedSearchItems.length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.fields}>
          {searchBarItems.map((item) => {
            return (
              <FilterItem<T>
                inputs={currentSearchBarValues}
                item={item}
                key={item.dataIndex.toString()}
                inline
                onChange={onChangeFilterValue}
              />
            );
          })}
        </div>
        <div className={styles.actions}>
          <Button
            color={ColorButtonEnum.REVERSED}
            dataTestId={dataTestId ? `${dataTestId}-reset` : undefined}
            label={localization.reset}
            onClick={handleReset}
          />
          {hasAdvancedSearch && (
            <Button
              color={ColorButtonEnum.REVERSED}
              dataTestId={dataTestId ? `${dataTestId}-open-advanced` : undefined}
              label={localization.advancedSearch}
              onClick={handleOpenAdvancedSearch}
            />
          )}
        </div>
      </div>
      {hasAdvancedSearch && (
        <Modal
          closeOnPressEscape
          closeOnClickOutside
          closeIcon
          disableTabOutside={disableTabOutside}
          onHide={handleCloseAdvancedSearch}
          show={advancedSearchOpen}
          size={'lg'}
          title={localization.advancedSearchTitle}>
          <ModalBody>
            <Row>
              {advancedSearchItems.map((item, index) => {
                return (
                  <FilterItem<T>
                    key={'dataIndex' in item ? item.dataIndex.toString() : `section-${index}`}
                    inputs={currentModalValues}
                    item={item}
                    onChange={onChangeAdvancedFilterValue}
                  />
                );
              })}
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              color={ColorButtonEnum.SECONDARY}
              dataTestId={dataTestId ? `${dataTestId}-advanced-reset` : undefined}
              label={localization.reset}
              onClick={handleAdvancedFilterReset}
            />
            <Button
              color={ColorButtonEnum.PRIMARY}
              dataTestId={dataTestId ? `${dataTestId}-advanced-submit` : undefined}
              label={localization.search}
              onClick={handleSubmitSearch}
            />
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};

Filter.defaultProps = {
  advancedSearchItems: undefined,
  initialValues: undefined,
  localization: {
    advancedSearch: 'Advanced search',
    advancedSearchTitle: 'Advanced search',
    search: 'Search',
    reset: 'Reset',
  },
  searchBarItems: [],
};

export default Filter;

import React, { ReactElement } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Filter, { IFilterProps } from './Filter';
import { FilterTypeEnum } from './types';
import { IToggleEntry } from '../../Atoms/CheckBoxInput';

interface IDemoType {
  checkbox: Array<IToggleEntry>;
  dateFrom: Date;
  dateTo: Date;
  multiselect: Array<string>;
  number: number;
  select: string;
  text: string;
}

export default {
  title: 'Organism/Filter',
  component: Filter,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof Filter>;

const Template: ComponentStory<(args: IFilterProps<IDemoType>) => ReactElement> = (args: IFilterProps<IDemoType>) => {
  const selectOptions = [
    { value: 'SELECT1', label: 'Option #1' },
    { value: 'SELECT2', label: 'Option #2' },
    { value: 'SELECT3', label: 'Option #3' },
    { value: 'SELECT4', label: 'Option #4' },
  ];

  return (
    <Filter<IDemoType>
      advancedSearchItems={
        args.advancedSearchItems || [
          {
            filterType: FilterTypeEnum.COLUMN,
            fields: [
              {
                filterType: FilterTypeEnum.TITLE,
                label: 'Section #1',
              },
              {
                dataIndex: 'number',
                filterType: FilterTypeEnum.NUMBER,
                label: 'Number',
                placeholder: 'Search number',
              },
              {
                dataIndex: 'checkbox',
                filterType: FilterTypeEnum.CHECKBOX,
                label: 'Checkbox',
              },
              {
                dataIndex: 'select',
                filterType: FilterTypeEnum.SELECT,
                isClearable: true,
                label: 'Select',
                options: selectOptions,
                placeholder: 'Select an option',
              },
            ],
          },
          {
            filterType: FilterTypeEnum.COLUMN,
            fields: [
              {
                filterType: FilterTypeEnum.TITLE,
                label: 'Section #2',
              },
              {
                dataIndex: 'text',
                filterType: FilterTypeEnum.TEXT,
                label: 'Text',
                placeholder: 'Search text',
              },
              {
                dataIndex: 'dateFrom',
                filterType: FilterTypeEnum.DATE,
                isClearable: true,
                label: 'From',
              },
              {
                dataIndex: 'dateTo',
                filterType: FilterTypeEnum.DATE,
                isClearable: true,
                label: 'To',
              },
              {
                dataIndex: 'multiselect',
                filterType: FilterTypeEnum.MULTISELECT,
                isClearable: true,
                label: 'Multiselect',
                numberOfItemLabel: '{} item selected',
                numberOfItemsLabel: '{} items selected',
                options: selectOptions,
                placeholder: 'Select options',
              },
            ],
          },
        ]
      }
      searchBarItems={
        args.searchBarItems || [
          {
            dataIndex: 'dateFrom',
            filterType: FilterTypeEnum.DATE,
            isClearable: true,
            label: 'From',
          },
          {
            dataIndex: 'dateTo',
            filterType: FilterTypeEnum.DATE,
            isClearable: true,
            label: 'To',
          },
          {
            dataIndex: 'multiselect',
            filterType: FilterTypeEnum.MULTISELECT,
            // It is recommended to set the fieldSize of select, multiselect, dynamic search and dynamic search creatable when inline.
            // If not set, the width of the select will adjust to its content.
            fieldSize: 3,
            isClearable: true,
            numberOfItemLabel: '{} item selected',
            numberOfItemsLabel: '{} items selected',
            options: selectOptions,
            placeholder: 'Select options',
          },
        ]
      }
      initialValues={
        args.initialValues || {
          checkbox: [
            {
              value: 'CHECKBOX1',
              label: 'Checkbox #1',
            },
            {
              value: 'CHECKBOX2',
              label: 'Checkbox #2',
            },
          ],
          dateFrom: new Date(),
        }
      }
      localization={
        args.localization || {
          advancedSearch: 'Advanced search',
          advancedSearchTitle: 'Advanced search',
          search: 'Search',
          reset: 'Reset',
        }
      }
      onChange={(newValue) => {
        if (args.onChange) {
          args.onChange(newValue);
        }
        console.log(newValue);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};

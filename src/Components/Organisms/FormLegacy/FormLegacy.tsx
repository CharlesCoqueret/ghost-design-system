import React, { Fragment, memo, ReactElement } from 'react';
import * as yup from 'yup';

import { FieldLegacyTypeEnum, IFieldAndLayoutLegacyProps } from './types';
import FormFieldLegacy from './FormFieldLegacy';
import { Col, Row, Section } from '../../Atoms/Layout';

export interface IFormProps<T extends yup.AnyObject> {
  enableOldData?: boolean;
  enableSideBySide?: boolean;
  fields: Array<IFieldAndLayoutLegacyProps<T>>;
  handleDataChange: (dataIndex: keyof T, newValue: T[keyof T]) => void;
  initialData: T;
  previousData?: T;
  validationError?: Partial<Record<keyof T, string>>;
  validationSchema: yup.ObjectSchema<T>;
  usePortal?: boolean;
}

const FormLegacy = <T extends yup.AnyObject>(props: IFormProps<T>): ReactElement => {
  const {
    enableOldData,
    enableSideBySide,
    fields,
    handleDataChange,
    initialData,
    previousData,
    validationSchema,
    validationError,
    usePortal,
  } = props;

  const localUsePortal = usePortal === undefined ? true : usePortal;

  return (
    <Col>
      {fields.map((field, index) => {
        // Managing hidden field
        if (
          field.hidden !== undefined &&
          ((typeof field.hidden === 'function' && field.hidden(initialData) === true) || field.hidden === true)
        ) {
          return <Fragment key={`hidden-${index}`}></Fragment>;
        }

        if (field.fieldType === FieldLegacyTypeEnum.SECTION) {
          return (
            <Section
              key={`section-${field.label}`}
              level={field.level}
              title={field.label}
              collapsible={field.collapsible}
              openInitially={field.openInitially}
              separator={field.separator}>
              <FormLegacy
                enableOldData={enableOldData}
                enableSideBySide={enableSideBySide}
                fields={field.fields}
                handleDataChange={handleDataChange}
                initialData={initialData}
                previousData={previousData}
                validationError={validationError}
                validationSchema={validationSchema}
                usePortal={localUsePortal}
              />
            </Section>
          );
        }
        if (field.fieldType === FieldLegacyTypeEnum.DESCRIPTION) {
          return <Row key={`description-${index}`}>{field.description}</Row>;
        }

        let isRequired = false;

        try {
          const descriptor = validationSchema.describe({ value: initialData });
          if (field.dataIndex in descriptor.fields) {
            const schemaDescription = descriptor?.fields[field.dataIndex] as yup.SchemaDescription;
            isRequired = !schemaDescription.optional && !schemaDescription.nullable;
          }
        } catch (e) {
          if (process.env.NODE_ENV === 'development') {
            console.error(
              `could not retrieve if ${JSON.stringify(
                field.dataIndex,
              )} is mandatory. It looks like you haven't defined a proper validation schema.`,
            );
          }
        }

        return (
          <FormFieldLegacy<T>
            enableOldData={enableOldData}
            enableSideBySide={enableSideBySide}
            key={`field-${field.label}`}
            field={field}
            data={initialData}
            previousData={previousData}
            handleChange={handleDataChange}
            validationError={validationError}
            requiredFromValidation={isRequired}
            usePortal={localUsePortal}
          />
        );
      })}
    </Col>
  );
};

export default memo(FormLegacy) as typeof FormLegacy;

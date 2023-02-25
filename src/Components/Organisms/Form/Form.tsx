import React, { Fragment, memo, ReactElement } from 'react';
import * as yup from 'yup';
import { AnyObject } from 'yup/lib/object';
import { SchemaDescription, SchemaObjectDescription } from 'yup/lib/schema';

import { FieldTypeEnum, IFieldAndLayoutProps } from './types';
import FormField from './FormField';
import { FieldError } from './yupResolver';
import { Col, Row, Section } from '../../Atoms/Layout';

export interface IFormProps<T extends AnyObject> {
  enableOldData?: boolean;
  enableSideBySide?: boolean;
  fields: Array<IFieldAndLayoutProps<T>>;
  handleDataChange: (dataIndex: keyof T, newValue: T[keyof T]) => void;
  initialData: T;
  previousData?: T;
  validationError?: Partial<Record<keyof T, FieldError>>;
  validationSchema?: yup.SchemaOf<T>;
  usePortal?: boolean;
}

const Form = <T extends AnyObject>(props: IFormProps<T>): ReactElement => {
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

        if (field.fieldType === FieldTypeEnum.SECTION) {
          return (
            <Section
              key={`section-${field.label}`}
              level={field.level}
              title={field.label}
              collapsible={field.collapsible}
              openInitially={field.openInitially}
              separator={field.separator}>
              <Form
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
        if (field.fieldType === FieldTypeEnum.DESCRIPTION) {
          return <Row key={`description-${index}`}>{field.description}</Row>;
        }

        let isRequired = false;

        try {
          const objectDescription = validationSchema?.describe() as SchemaObjectDescription | undefined;
          const schemaDescription = objectDescription?.fields[field.dataIndex as string] as SchemaDescription;
          isRequired = schemaDescription.tests.some((test) => test.name === 'required');
        } catch {
          console.warn(`could not retrieve if ${JSON.stringify(field.dataIndex)} is mandatory`);
        }

        return (
          <FormField<T>
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

export default memo(Form) as typeof Form;

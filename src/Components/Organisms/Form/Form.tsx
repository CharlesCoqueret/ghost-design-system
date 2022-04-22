import React, { Fragment, ReactElement } from 'react';
import * as yup from 'yup';
import { AnyObject } from 'yup/lib/object';
import { SchemaDescription, SchemaObjectDescription } from 'yup/lib/schema';

import { FieldTypeEnum, IFieldAndLayoutProps } from './types';
import FormField from './FormField';
import { FieldError } from './yupResolver';
import { Container, Col, Row, Section } from '../../Atoms/Layout';

export interface IFormProps<T extends AnyObject> {
  fields: Array<IFieldAndLayoutProps<T>>;
  handleDataChange: (dataIndex: keyof T, newValue: T[keyof T]) => void;
  initialData: T;
  previousData?: T;
  validationError?: Partial<Record<keyof T, FieldError>>;
  validationSchema?: yup.SchemaOf<T>;
  usePortal?: boolean;
}

const Form = <T,>(props: IFormProps<T>): ReactElement => {
  const { fields, handleDataChange, initialData, previousData, validationSchema, validationError, usePortal } = props;

  return (
    <Container>
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
                title={field.label}
                collapsable={field.collapsable}
                openInitially={field.openInitially}>
                <Form
                  fields={field.fields}
                  handleDataChange={handleDataChange}
                  initialData={initialData}
                  previousData={previousData}
                  validationError={validationError}
                  validationSchema={validationSchema}
                  usePortal={usePortal}
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
            console.warn(`could not retrieve if ${field.dataIndex} is mandatory`);
          }

          return (
            <FormField<T>
              key={`field-${field.label}`}
              field={field}
              data={initialData}
              previousData={previousData}
              handleChange={handleDataChange}
              validationError={validationError}
              requiredFromValidation={isRequired}
              usePortal={usePortal}
            />
          );
        })}
      </Col>
    </Container>
  );
};

Form.defaultProps = {
  previousData: undefined,
  validationError: undefined,
  validationSchema: undefined,
  usePortal: true,
};

export default Form;

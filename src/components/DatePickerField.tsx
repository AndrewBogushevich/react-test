import { useField, useFormikContext } from 'formik';
import React from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

export const DatePickerField = ({ ...props }: ReactDatePickerProps) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props.name || '');
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};

export default DatePickerField;

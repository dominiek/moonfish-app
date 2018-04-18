
import React from 'react';
import { Form } from 'semantic-ui-react';

export default function FormInput({
  input,
  type,
  label,
  placeholder,
  as: As = Form.Checkbox,
  meta,
  ...props
}) {
  function handleChange(e, { checked }) {
    return input.onChange(checked);
  }

  return (
    <Form.Field error={!!(meta.error && meta.touched)}>
      <As
        {...props}
        label={label}
        checked={!!input.value}
        onChange={handleChange}
      />
    </Form.Field>
  );
}

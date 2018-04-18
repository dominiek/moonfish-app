import React from 'react';
import FormInput from 'components/FormInput';
import FormCheckbox from 'components/FormCheckbox';
import { Field } from 'react-final-form';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import { required } from 'utils/validate';

export default (props) => {
  const { handleSubmit, submitting, submitError } = props;
  return (
    <Form error size="large" onSubmit={handleSubmit}>
      { submitError && <Message error content={submitError} /> }
      <b>Please read and acknowledge</b>
      <br /><br />
      <Field
        name="acceptWhitepaper"
        component={FormCheckbox}
        validate={required}
        label={(
          <label>
            I confirm that I have read and understood the {' '}
            <a href="/downloads/moonfish-draft.pdf" target="_blank">Moonfish whitepaper</a>
          </label>
        )}
      />
      <Field
        name="acceptTerms"
        component={FormCheckbox}
        validate={required}
        label={(
          <label>
            I confirm that I have read and understood the {' '}
            <a href="/terms" target="_blank">Token Sale Terms</a> and {' '}
            <a href="/privacy" target="_blank">Privacy Policy</a>
          </label>
        )}
      />
      <Field
        name="acceptCompliance"
        component={FormCheckbox}
        validate={required}
        label={(
          <label>
            I confirm that by purchasing these tokens I am complying
            with the relevant laws of my domestic country
          </label>
        )}
      />
      <Field
        name="firstName"
        label="First Name"
        component={FormInput}
        validate={required}
      />
      <Field
        name="lastName"
        label="Last Name"
        validate={required}
        component={FormInput}
      />

      <Field
        name="ethAmount"
        labelPosition="right"
        beforeInput={<label>How much are you planning to invest?</label>}
        component={FormInput}
        as={Input}
        type="number"
        validate={required}
        label={{ basic: true, content: 'ETH' }}
        placeholder="Ethereum amount"
      />
      <Button
        fluid
        primary
        size="large"
        content="Register"
        loading={submitting}
        type="submit"
      />
    </Form>
  );
};


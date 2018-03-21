import React from 'react';
import { Segment, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default ({ error }) => {
  let message = error.message;
  if (error.status === 401 && message.includes('expired')) {
    message = 'Your session is expired';
  }

  return (
    <Segment textAlign="center" >
      <Message error content={message} />
      <p>
        <Link to="/apply">
          Please restart the application process {' '}
          <Icon size="small" name="undo" />
        </Link>
      </p>
    </Segment>
  );
};
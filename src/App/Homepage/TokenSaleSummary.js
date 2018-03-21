
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Loader,
  Icon,
  Divider
} from 'semantic-ui-react';
import Countdown from './Countdown';

const renderActive = () => {
  return (
    <div>
      <h2>Token Sale Is Live</h2>
      <Button as={Link} to="" basic secondary size="large" style={{ textTransform: 'uppercase' }}>
        Buy Tokens
        <Icon name="right arrow" />
      </Button>
    </div>
  );
};

const renderWhitelist = (status) => {
  return (
    <div>
      <h5>Token Sale Starting In</h5>
      <Countdown date={status.startTS} />
      <Divider hidden />
      <Button as={Link} to="/apply" basic secondary size="large" style={{ textTransform: 'uppercase' }}>
        Apply for Whitelist
        <Icon name="right arrow" />
      </Button>
    </div>
  );
};

const renderEnded = () => {
  return (
    <div>
      <h3>Token Sale Ended</h3>
      <p style={{ fontSize: '20px' }}>Thanks for everyone who participated!</p>
    </div>
  );
};

const renderSummary = (status) => {
  if (status.isActive) return renderActive();
  if (status.acceptApplicants) return renderWhitelist(status);
  return renderEnded();
};

export default (props) => {
  const { info } = props;
  return (
    <div className="token-sale-summary">
      { info ? renderSummary(info) : (<Loader />)}
    </div>
  );
};

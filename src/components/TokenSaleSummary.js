
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
      <Button primary size="large">
        Buy Tokens
        <Icon name="right arrow" />
      </Button>
    </div>
  );
};

const renderWhitelist = (details) => {
  return (
    <div>
      <h2>Token Sale Starting In</h2>
      <Countdown date={details.startTimeTs} />
      <Divider hidden />
      <Button as={Link} to="/apply" primary size="large">
        Apply for Whitelist
        <Icon name="right arrow" />
      </Button>
    </div>
  );
};

const renderEnded = () => {
  return (
    <div>
      <h2>Token Sale Ended</h2>
      <p>Thanks for everyone who participated!</p>
    </div>
  );
};

const renderSummary = ({ details, status }) => {
  if (status.isActive) return renderActive();
  if (status.acceptApplicants) return renderWhitelist(details);
  return renderEnded();
};

export default (props) => {
  const { info } = props;
  return (
    <div className="token-sale-summary" style={{ textAlign: 'center' }}>
      { info ? renderSummary(info) : (<Loader />)}
    </div>
  );
};


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
      <h5>Token Sale Is Live</h5>
      <Button as={Link} to="" basic secondary size="large" style={{ textTransform: 'uppercase' }}>
        Buy Tokens
        <Icon name="right arrow" />
      </Button>
    </div>
  );
};

const renderWhitelist = (details) => {
  return (
    <div>
      <h5>Token Sale Starting In</h5>
      <Countdown date={details.startTimeTs} />
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
      <h5>Token Sale Ended</h5>
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
    <div className="token-sale-summary">
      { info ? renderSummary(info) : (<Loader />)}
    </div>
  );
};

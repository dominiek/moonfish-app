import React from 'react';
import {
  Header,
  Image,
} from 'semantic-ui-react';

import fish from 'assets/moonfish-fish.svg';

export default ({ title }) => {
  return (
    <React.Fragment>
      <Image src={fish} alt="Moonfish" style={{ height: '80px', margin: '0 auto' }} />
      <Header as="h3" textAlign="center" style={{ color: '#FBCE0E', textTransform: 'uppercase' }}>
        {title}
      </Header>
    </React.Fragment>
  );
};
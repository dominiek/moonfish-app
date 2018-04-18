import 'theme/semantic.less';

import React from 'react';
import ReactDOM from 'react-dom';

import createHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore, RouterStore } from 'mobx-react-router';
import { useStrict } from 'mobx';
import App from 'App';

useStrict(true);

const routing = new RouterStore();
const history = syncHistoryWithStore(createHistory(), routing);

const stores = {
  routing
};

ReactDOM.render(<App stores={stores} history={history} />, document.getElementById('root'));

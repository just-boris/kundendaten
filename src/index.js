import './styles.css';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import createStore from './store';
import reducers from './reducers';
import {Router, Route, browserHistory} from 'react-router';
import Account from './components/account';
import AccountsList from './components/accounts-list';

const store = createStore(reducers);
const content = (<Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AccountsList} />
      <Route path="/:accountId" component={Account} />
    </Router>
</Provider>);

render(content, document.getElementById('app'));

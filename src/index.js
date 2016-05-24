import './styles.css';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import App from './components/app';

const content = <Provider store={store}><App/></Provider>

render(content, document.getElementById('app'));

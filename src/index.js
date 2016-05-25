import './styles.css';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import App from './components/app';

import React from 'react';
window.React = React;

const content = <Provider store={store}><App/></Provider>;

render(content, document.getElementById('app'));

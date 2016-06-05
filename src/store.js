import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

const createEnhancedStore = applyMiddleware(thunkMiddleware)(createStore);
export default createEnhancedStore;

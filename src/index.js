import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers/reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

let store = createStore(reducers);

ReactDOM.render(
	<Provider store={store} >
		<App />
	</Provider>, 
	document.getElementById('root'));
// registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers'
import App from './App';
import './index.css';
const store = createStore(reducers, compose(applyMiddleware(thunk)));

//Not deprecated redux toolkit
// export const store = configureStore({
//     reducer: {
//       todos: reducers,
//       filters: filtersReducer
//     }
//   })

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store} from './redux/store'
import {Provider} from 'react-redux'
import {initPage} from "./redux/triviaSlice";

const root = ReactDOM.createRoot(document.getElementById('root'));
export var amountOfQuestions=5;
export var lastPage=1;
store.dispatch(initPage({amountOfQuestions}))

root.render(
    <React.Fragment>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {store} from './redux/Store/store'
import {Provider} from 'react-redux'
import {initPage} from "./redux/Slices/triviaSlice";

const root = ReactDOM.createRoot(document.getElementById('root'))
export var amountOfQuestions=25
export var lastPage=5
store.dispatch(initPage({amountOfQuestions}))

root.render(
    <React.Fragment>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.Fragment>
);


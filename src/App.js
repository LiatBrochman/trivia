import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {Fragment} from 'react';

import End from "./End";
import Home from "./Home"
import Pages from "./Pages"


function App() {
    return (

        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route path="/" element={<Home/>}/>

                    <Route path="/end" element={<End/>}/>

                    <Route path="/pages" element={<Pages/>}/>

                </Routes>
            </Fragment>
        </BrowserRouter>
    );
}

export default App;

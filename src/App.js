import './App.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import React, {Fragment} from 'react';

import End from "./End";
import Game from "./Game";
import Home from "./Home"
import Pages from "./Pages"

function Users() {
    return null;
}



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

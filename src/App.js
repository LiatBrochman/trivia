import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Link
} from "react-router-dom";
import React, {Fragment} from 'react';

import About from "./About";
import Game from "./Game";


function Users() {
    return null;
}

function Home() {
    return null;
}

function App() {
    return (

        <Router>
            <Fragment>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/game">Game</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/" element={<Home/>}/>

                    <Route path="/about" element={<About/>}/>

                    <Route path="/game" element={<Game/>}/>

                </Switch>
            </Fragment>
        </Router>
    );
}

export default App;

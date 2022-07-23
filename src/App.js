
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {Fragment, useEffect} from 'react';

import End from "./Components/Pages/End";
import Home from "./Components/Pages/Home"
import Pages from "./Components/Pages/Pages"


function App() {
    // if (window.performance) {
    //     if (performance.navigation.type === 1) {
    //         alert( "This page is reloaded" );
    //     } else {
    //         alert( "This page is not reloaded");
    //     }
    // }


    // const navigate = useNavigate();

    // i dont understand the function here
    useEffect(() => {
        window.onbeforeunload = (e) => {
            if (e) {
                e.preventDefault();
                // navigate('/')
                e.returnValue = ''
            }
            return '';
        }
    }, [window.onbeforeunload])

    return (

        <BrowserRouter>
            <Fragment>
                <Routes>
                     {/*why have two routes home components?*/}
                    <Route path="/trivia" element={<Home/>}/>
                    <Route path="/" element={<Home/>}/>

                    <Route path="/end" element={<End/>}/>

                    <Route path="/pages" element={<Pages/>}/>

                </Routes>
            </Fragment>
        </BrowserRouter>
    );
}

export default App;

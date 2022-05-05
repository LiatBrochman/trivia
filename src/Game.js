import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {renderApp} from "./redux/triviaSlice";
import _ from "lodash";


export default function Game() {

    const dispatch = require("react-redux").useDispatch()
    const trivia = useSelector(state => state.trivia)
    // const [state, setState] = useState(undefined);
    //
    // useEffect(() => {
    //     setState(_.cloneDeep(trivia))
    // }, [,dispatch]);

    return (<div>
        {renderApp(trivia,dispatch)}
    </div>)
}




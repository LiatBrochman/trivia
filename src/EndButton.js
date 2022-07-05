import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {lastPage} from "./index";
import {useNavigate} from 'react-router-dom';

function EndButton() {
    const grade = useSelector(state => state.grade.value)
    const page_number = useSelector(state => state.pages.currentPage)
    const isEndDisabled = useSelector(state => state.pages.allowedEnd)
    const [clickTrigger, setClickTrigger] = useState(false)
    const navigate = useNavigate();

    return (
        <div className="end-quiz">
            <span className="grade-sentence">{`You scored ${grade}/25 correct answers`}</span>
            <button className="game-button-end-quiz" hidden={page_number !== lastPage}
                    disabled={!isEndDisabled}
                    onClick={()=>setClickTrigger(true)}
            >
                End quiz
                {clickTrigger && navigate('/end')}
            </button>
        </div>
    );
}

export default EndButton;
import React from "react";
import './styles/start.css'

export default function start(props){





    return(
        <div className="start--page">
        <div className="start--content">
        <h1>Quizzical</h1>
        <p>Answer as best as you can</p>
        <button className="start--button" onClick={props.quiz}>Start Quiz</button>
        </div>
        </div>
    )
}
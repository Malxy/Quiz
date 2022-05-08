import React from 'react'
import "./styles/question.css"

export default function question(props)
{   
    console.log(props.id)
    let question = props.question.replaceAll("&quot;","\"")
    question = question.replaceAll("&#039;","'")
    
    

    return(
        <div className="question">
        <h2>{question}</h2>

        </div>
    )
}
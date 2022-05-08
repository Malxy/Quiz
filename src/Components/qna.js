import React from 'react'
import "./styles/question.css"
import CustomButton from "./buttons"
import { nanoid } from 'nanoid'

export default function Qna(props)
{   
    const [isSelected,setSelected] = React.useState([])
    const shuffledAnswers = shuffle(props.answers.all)
    function Quizna() // organizes data received in isSelected
    {
        setSelected(function() 
            {   const newArray = []
                shuffledAnswers.map(function(item)
                {
                    const updatedArray = {
                        answer:item,
                        isSelected:false,
                        id:nanoid(),
                        isCorrect: item === props.answers.correct ? true : false
                    }
                
                    newArray.push(updatedArray)
                })
               
                return newArray
            })
    }
    
    let question = props.question.replaceAll("&quot;","\"")
    question = question.replaceAll("&#039;","'")

    function shuffle(answers) {
        answers.sort(() => Math.random() - 0.5)
        return answers;
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(function(){
         // eslint-disable-next-line react-hooks/exhaustive-deps
        Quizna()

    },[])
     // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(function(){
        console.log("Effect Ran")
        isSelected.map(item => {
            if(item.isSelected === true )
            {props.check(item.answer,props.question,item.isCorrect)}
        })
    },[isSelected])

    function toggle(id)
    {
        setSelected(prevState => {
            let counter = 0 
            const newState = []
            prevState.map(function(item)
            {
                if(item.id === id)
                {
                    const updatedState = {
                    ...item,
                    isSelected:!item.isSelected
                    }

                    
                    
                    newState.push(updatedState)
                }
                else
                {
                const disableSelected = {
                ...item,
                isSelected:false
                }
                newState.push(disableSelected)
                }
            })
            return newState

    

        })

     
    }

    const buttons = isSelected.map(function(item)
    {   
        return <CustomButton isCorrect={item.isCorrect} isSubmited = {props.isSubmited} toggle={toggle} content={item.answer} isSelected={item.isSelected} id={item.id} key = {item.id} />
    })
    return(


        <div className="qna">
        <h2>{question}</h2>
        <div className="buttons">
        {buttons}
        </div>
        </div>
    )
}
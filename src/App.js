import React from "react";
import Start from "./Components/start"
import { nanoid } from 'nanoid'
import QnA from "./Components/qna"
import './App.css'

function App() {
  const [apiData,setApiData] = React.useState([])
  React.useEffect(function(){
    fetch('https://opentdb.com/api.php?amount=7')
    .then(response => response.json())
    .then(data => setApiData(data.results));
  },[])


  const [notes, setNotes] = React.useState([]) //In here store Question and Answers received from api  , probably not needed
  const [startQuiz,setStartQuiz] = React.useState(false)
  const [quizData,setQuizData] = React.useState([]) //Store data received from qna here 
  const [count,setCount] = React.useState(0) //Counts number of questions answered correctly
  const [checkAnswers,setCheckAnswers] = React.useState(false) //This changes state to true when Check answers button is pressed
  
  function start(){ //Runs when pressing starts 
    setStartQuiz(true) //Changes startQuiz to true for conditional rendering in main
    apiData.map(function(item) // saves in notes all the questions and answers
    {
      const newNote = {
        id: nanoid(),
        question:item.question,
        answers:{
          all:[item.correct_answer,...item.incorrect_answers],
          correct:item.correct_answer,
          incorrect:item.incorrect_answers
        }
    }
    return setNotes(prevNotes => [...prevNotes, newNote])
  })
}

function check(item,question,isCorrect){
  setQuizData(prevState => {
    let newArray = [...prevState]
    let alreadyExists = false
    let existingArray = prevState.map(mapItem => {
      if(mapItem.question === question)
      {alreadyExists = true
      return ({
        ...mapItem,
        answer:item,
        isCorrect:isCorrect
      })
    }
      else return mapItem
    }
    )

    if(alreadyExists === false)
    {
    const updatedArray = {
      question:question,
      answer:item,
      isCorrect:isCorrect
    }
    newArray.push(updatedArray)
    return newArray
   }
   else {
     return existingArray
   }
    
  })
  

}

function assign(){ //saves the question components in a variable
const apiel = notes.map(function(item){
    return <QnA 
    key={item.id} 
    question={item.question}
    answers = {item.answers}
    check = {check}
    isSubmited = {checkAnswers}
    />
  

})
return apiel

}
function handleSubmit(){
  let counter = 0
  let answerCounter = 0
  quizData.map(item => {
    if(item.isCorrect === true)
    counter = counter + 1
    answerCounter = answerCounter + 1
  })
  console.log(notes.length)
  if(answerCounter < notes.length)
  alert("You have unanswered questions !")
  else
  {
  setCount(counter)
  setCheckAnswers(true)
  
  }
  if(checkAnswers === true )
  {
    window.location.reload()
  }
}


  return (
   <main className = "main--container">
    {startQuiz ? assign() : <Start quiz={start} />}
    <div className="submit--container">
    {checkAnswers === true && <h2>You have answered {count}/{notes.length} question(s) correctly</h2>}
    {startQuiz && <button  className = "submit--buton" onClick={handleSubmit}>{checkAnswers === false ? "Check Answers" : "Play Again"}</button>}
    </div>
    </main>
  );
}

export default App;

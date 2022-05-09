import React from "react"
import "./styles/question.css"
    
export default function Buttons(props)
{
console.log(props.isCorrect)

let styles = {

    backgroundColor:props.isSelected? "#4D5B9E" : "transparent",
    color:props.isSelected ? "white" : "black"
}
if(props.isSubmited === true)
{
    styles = {
        backgroundColor:props.isCorrect ? "#94D7A2" : (props.isSelected ? "#F8BCBC" : "transparent"),
        color:props.isSelected || props.isCorrect ? "white" : "black",
        fontWeight :(props.isSelected || props.isCorrect) && "bold"
    }
}

let content = props.content.replaceAll("&quot;","\"")
    content = question.replaceAll("&#039;","'")
    

return(
    
     <button style={styles} className = "buttons" onClick={() => props.toggle(props.id)}>{
content}</button>
    
)

}

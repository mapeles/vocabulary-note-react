import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { ChangeScore, WordDB, currentVoca } from "./MainPage";

function VocaElement(props) {
    const {word,mean,score,id} = props
    const navigate = useNavigate();
    return(
        <Word>
            <WordDetail word={word} mean={mean} />
            <div style={{height:'10vh', width: '8vh', display:"flex", alignItems:'center', flexDirection:"column", justifyContent: "space-around", margin:"5px"}}>
                <VocaDegree scorePoint={score} id={id}/>
              <div style={{color:'white'}} onClick={() => navigate("edit/", {state:id})}>
                ✐
              </div>
            </div>
        </Word>
    )
}

function WordDetail(props) {
    const [display,setDisplay] = useState(false)
    return(
      <div style={{flex: '1 0 auto', width: '25vh'}}>
        <Detail onClick={() => setDisplay(!display)}>
          <WordText>{props.word}</WordText>
          {display ? <p>{props.mean}</p> : null}
        </Detail>
        
      </div>
    )
}
function VocaDegree(props){
  const [score, setScore] = useState(props.scorePoint)
  const Change = () => {
    ChangeScore(props.id)
    setScore(WordDB[currentVoca].contents[props.id].score)

  }
  return(
    <div onClick={Change}>
        <VocaDegreeDetail score={score}>
        {
          (score >= 60)? 
            '외움' : 
          (score >= 30)? 
            '애매' :
            '모름'
          
        }
      </VocaDegreeDetail>
    </div>
  )
}
const VocaDegreeDetail = styled.div`
  background-color: ${(props) => (
    props.score >= 60?
     `green` : 
     props.score >= 30?
    'orange':
    'grey')};
  font-size: 10px;
  width: 4vh;
  text-align: center;
  border: 0px;
  border-radius: 5px;
  padding: 1px 0px;
`
export const WordText = styled.h1`
  font-size: 24px;
`
export const Detail = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 auto;

  padding: 10px;
  padding-left: 30px;
`
export const Word = styled.div`
  background-color: #2B2B2B;
  width: 45vh;
  border-radius: 10px;
  margin-top: 2vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export default VocaElement
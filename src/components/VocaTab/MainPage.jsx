import { useEffect, useState } from "react"
import styled from "styled-components"
import TitleName from "../ui/Title"
import VocaElement, { Detail, Word, WordText } from "./VocaElement"
import Top from "../ui/Top"
import Append, { WordInput } from "./Append"
import {BrowserRouter, Routes, Route } from "react-router-dom"; 
import { Link, useNavigate } from 'react-router-dom';
import { v4 } from "uuid"
import Edit from "./edit"
const WordDB = {
  "66736108-c769-42da-b0c6-64ef05e7b34f":{
    VocaName: "첫번째 단어장",
    contents: {
      "1a687a1f-25c1-4fbd-9624-f259d0a784c9":{
        word: 'apple',
        mean: '사과',
        score: '100'
      },
      "8d43c6ed-e1ca-4486-a087-267876737a53":{
        word: 'banana',
        mean: '바나나',
        score: '50'
      },
      "c44a1c0c-3a10-4ed4-996b-086e1475d4f8":{
        word: 'cocoa',
        mean: 'test',
        score: '0'
      },
    }
  },
  "1ad10e50-657f-427f-a80d-8143ac45e5e0":{
    VocaName: "두번째 단어장",
    contents: {
      "822dac2b-ad93-45ea-b6ca-cd7e860b7b35":{
        word: 'test',
        mean: 'test',
        score: '0'
      },
      "c44a1c0c-3a10-4ed4-9962-086e1475d4f8":{
        word: 'pneumoconiosis',
        mean: '진폐증',
        score: '0'
      }
    }
  }
}
export function getWord(id){
  const a = WordDB[currentVoca].contents[id]
  return a
}
let currentVoca = Object.keys(WordDB)[0]
export function WordAppend(id, word, mean, pron, desc,score){
    WordDB[currentVoca].contents[id] = {
      word : word,
      mean : mean,
      pron : pron,
      desc : desc,
      score: score
  }
  console.log(WordDB)
  console.log(WordDB[currentVoca].contents[id])
}
function NoteAppend(id, name){
  WordDB[id] = {
    VocaName: name,
    contents: {}
  }
}
function Voca() {
  const [onAppend, setOnAppend] = useState(false)
    return(
      <BrowserRouter>      
        <Routes>
          <Route path="/" element = {<PageDetail/>}/>
          <Route path="/append" element = {<Append/>}/>
          <Route path="/selectNote" element = {<SelectNote/>}/>
          <Route path="/appendNote" element = {<AppendNote/>}/>
          <Route path="/edit" element = {<Edit/>}/>
        </Routes>    
    </BrowserRouter>
    )
}
function PageDetail(props){
  const navigate = useNavigate();
  return(
    <div style={{width :'45vh'}}>
        <Top>
            <TitleName>단어장</TitleName>
            <p onClick={() => navigate('/append')} style={{fontSize:'30px',fontWeight:'800',margin:'0px'}}>+</p>
        </Top>
        <div style={{color:"white", display:"flex", justifyContent: "space-between", flexDirection: "row"}}>
            <p style={{margin:"0px"}}>선택한 단어장</p>
            <div style={{ display :"flex",flexDirection:"column", justifyContent: "center"}}>
              <p style={{ margin: "0px",color:"grey", fontSize: "12px"}} onClick={() => navigate('/selectNote')}>{'> '}{WordDB[currentVoca].VocaName}</p>
            </div>
        </div>
        <Scrollable>
          {Object.keys(WordDB[currentVoca].contents).map(key => (
            <VocaElement 
              word={WordDB[currentVoca].contents[key].word} 
              mean={WordDB[currentVoca].contents[key].mean} 
              score={WordDB[currentVoca].contents[key].score}
              id={key}
            />
          ))}
        </Scrollable>
        
      </div>
  )
}
function SelectNote(){
  const navigate = useNavigate();
  return(
    <div style={{width :'45vh'}}>
      <div style={{color:"white", display: "flex", flexDirection: 'row', justifyContent: "space-between"}}>
        <div style={{color: 'white', display:'flex', flexDirection:'row'}}>
            <TitleName onClick={() => navigate('/')}>⬅️</TitleName>
              <div style={{width : '10px'}}></div>
            <TitleName>단어장 선택하기</TitleName>
        </div>
        <div style={{color:"white", display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <p onClick={() => navigate('/appendNote')}>추가</p>
        </div>
      </div>
      {Object.keys(WordDB).map(key => (
            <NoteElement noteName={WordDB[key].VocaName} keyValue={key}/>
          ))}
    </div>
  )
}
function AppendNote() {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const append = () => {
    if (name == ''){
      alert('단어장의 이름을 입력하세요')
    }
    else{
      NoteAppend(v4(),name)
      navigate('/selectNote')
    }
  }
  return(
    <div>
      <Top>
        <TitleName onClick={() => navigate('/')}>⬅</TitleName>
        <p onClick={append}>저장하기</p>
      </Top>
      <WordInput value={name} onChange={(e) => setName(e.target.value)} placeholder="단어장의 이름를 입력하세요"/>
    </div>
  )
}
function NoteElement(props){
  const navigate = useNavigate();
  const key = props.keyValue
  const clicked = () => {
    currentVoca = key
    navigate('/')
  }
  return(
    <Word onClick={clicked}>
      <Detail>
        <WordText>{props.noteName}</WordText>
      </Detail>
    </Word>
  )
}
const Scrollable = styled.div`
  overflow-y: scroll;
  height: 80vh;
  &::-webkit-scrollbar{
    display:none;
  }
`
export default Voca
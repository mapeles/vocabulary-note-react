import { useEffect, useState } from "react"
import styled from "styled-components"
import TitleName from "../ui/Title"
import VocaElement from "./VocaElement"
import Top from "../ui/Top"
import Append from "./Append"
import {BrowserRouter, Routes, Route } from "react-router-dom"; 
import { Link, useNavigate } from 'react-router-dom';
import Edit from "./edit"
import { SelectNote } from "./Note"
import { AppendNote } from "./Note"
export const WordDB = {
  "66736108-c769-42da-b0c6-64ef05e7b34f":{
    VocaName: "첫번째 단어장",
    contents: {
      "1a687a1f-25c1-4fbd-9624-f259d0a784c9":{
        word: 'apple',
        mean: '사과',
        score: 100
      },
      "8d43c6ed-e1ca-4486-a087-267876737a53":{
        word: 'banana',
        mean: '바나나',
        score: 50
      },
      "c44a1c0c-3a10-4ed4-996b-086e1475d4f8":{
        word: 'cocoa',
        mean: 'test',
        score: 0
      },
    }
  },
  "1ad10e50-657f-427f-a80d-8143ac45e5e0":{
    VocaName: "두번째 단어장",
    contents: {
      "822dac2b-ad93-45ea-b6ca-cd7e860b7b35":{
        word: 'test',
        mean: 'test',
        score: 0
      },
      "c44a1c0c-3a10-4ed4-9962-086e1475d4f8":{
        word: 'pneumoconiosis',
        mean: '진폐증',
        score: 0
      }
    }
  }
}
export function getWord(id){
  const a = WordDB[currentVoca].contents[id]
  return a
}
export function ChangeScore(id){
  const score = WordDB[currentVoca].contents[id].score
  if (score>=60){
    WordDB[currentVoca].contents[id].score = 0
  }
  else if (score>=30){
    WordDB[currentVoca].contents[id].score = 60
  }
  else{
    WordDB[currentVoca].contents[id].score = 30
  }
  console.log(WordDB[currentVoca].contents[id].score)
}
export let currentVoca = Object.keys(WordDB)[0]
export function setNote(id){
  currentVoca = id
}
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
export function DeleteWord(id){
  delete WordDB[currentVoca].contents[id]
}
export function NoteAppend(id, name){
  WordDB[id] = {
    VocaName: name,
    contents: {}
  }
}
function Voca() {
    return(
      <div style={{height:'100%'}}>     
          <Routes>
            <Route path="/" element = {<PageDetail/>}/>
            <Route path="/append" element = {<Append/>}/>
            <Route path="/selectNote" element = {<SelectNote/>}/>
            <Route path="/appendNote" element = {<AppendNote/>}/>
            <Route path="/edit" element = {<Edit/>}/>
          </Routes>    
      </div>
      
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
export const Scrollable = styled.div`
  overflow-y: scroll;
  margin-top: 10px;
  height: 73vh;
  &::-webkit-scrollbar{
    display:none;
  }
`
export default Voca
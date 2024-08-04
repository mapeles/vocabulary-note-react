import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import TitleName from "../ui/Title";
import Top from "../ui/Top";
import { Detail, Word, WordText } from "../VocaTab/VocaElement";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { WordInput } from "../VocaTab/Append";
import { Scrollable } from "../VocaTab/MainPage";

const SentenceDB={
    "66736108-c769-42da-b0c6-64ef05e7b34f":{
        SentenceName:"테스트용 문장",
        contents:{
            Sentence:["이것은","테스트용","문장입니다.","리엑트"],
        }
    }
}
export function AppendSentence(id, sentenceName, sentence){
    SentenceDB[id] = {
      SentenceName:sentenceName,
      contents:{
        Sentence:sentence
      }
  }
}
/*

채점기능에서 특수기호를 스킵하는거를 만드는게 나을듯?
망각곡선

*/
function WordElementComp(props){
    const [blind, setBlind] = useState(props.blind)
    return(
        <WordElement blind={blind} onClick={() => setBlind(!blind)}>{props.contents}</WordElement>
    )
}
const WordElement = styled.p`
    &:hover {cursor: pointer;}
    user-select: none;
    display: inline;
    background-color: ${(props) => (
    props.blind ?
     `grey` : 
     `null`
    )};
    color: ${(props) => (
    props.blind ?
     `grey` : 
     `white`
    )};
`
function SentenceElement(props) {
    const id = props.keyValue
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate("Detail/", {state:id})}>
            <Word>
                <Detail>
                    <WordText>{props.SentenceName}</WordText>
                </Detail>
            </Word>
        </div>
      )
}
export function SentencePage(){
    return(
        <div style={{height:'100%'}}>
            <Routes>
                <Route path="/" element={<Sentence/>}/>
                <Route path="/Detail" element={<SentenceDetail/>}/>
                <Route path="/Append" element={<AppendSentencePage/>}/>
                <Route path="/Detail/Edit" element={<EditSentence/>}/>
            </Routes>
        </div>
    )
}
function SentenceDetail(){
    const location = useLocation()
    const id = location.state
    const navigate = useNavigate();
    console.log(SentenceDB[id].SentenceName)
    let blind = [];
    for (let i = 0; i < SentenceDB[id].contents.Sentence.length; i++) {
    blind.push(true);
    }
    return(
        <div style={{color:"white", marginTop:'1vh'}}>
            <Top>
                <TitleName onClick={() => navigate('/Sentence')}>⬅️</TitleName>
                <TitleName>{SentenceDB[id].SentenceName}</TitleName>
                <div style={{color:'white'}} onClick={() => navigate("Edit/", {state:id})}>
                ✐
                </div>
            </Top>
            <div style={{lineHeight:"150%"}}>
                <Scrollable>
                    {Object.keys(SentenceDB[id].contents.Sentence).map(key => (
                        <div style={{display:"inline"}}>
                            <WordElementComp blind={blind} contents={SentenceDB[id].contents.Sentence[key]}/>
                            <p style={{display:"inline",userSelect: 'none'}}> </p>
                        </div>
                    ))}
                </Scrollable>
            </div>
        </div>
    )
}
function Sentence(){
    const navigate = useNavigate();
    return(
        <div>
            <Top>
                <TitleName>문장노트</TitleName>
                <p onClick={() => {navigate('/sentence/Append')}} style={{fontSize:'30px',fontWeight:'800',margin:'0px'}}>+</p>
            </Top>
            {Object.keys(SentenceDB).map(key => (
                <SentenceElement SentenceName={SentenceDB[key].SentenceName} keyValue={key} />
            ))}
        </div>
    )
}

function AppendSentencePage(){
    const navigate = useNavigate();
    const [sentence, setSentence] = useState('')
    const [sentenceName, setSentenceName] = useState('')
    const append = () => {
        if (sentenceName == '' || sentence == ''){
            alert('문장의 제목이나 내용을 입력하세요')
        }
        else {
            AppendSentence(v4(),sentenceName,sentence.split(' '))
            navigate('/sentence')
            console.log(SentenceDB)
        }
    }
    return(
        <div>
            <Top>
                <Top>
                    <TitleName onClick={() => navigate('/sentence')}>⬅️</TitleName>
                    <p style={{padding:"5px"}}></p>
                    <TitleName>추가하기</TitleName>
                </Top>
                <p onClick={append} >추가</p>
            </Top>
            <WordInput value={sentenceName} onChange={(e) => setSentenceName(e.target.value)} type="text" placeholder="문장의 이름을 입력하세요"/>
            <TextInputArea value={sentence} onChange={(e) => setSentence(e.target.value)} rows="20" cols="39" placeholder="이곳에 글을 입력하세요"/>
        </div>
    )
}
function EditSentence(){
    const location = useLocation()
    const id = location.state
    const navigate = useNavigate();
    const [sentence, setSentence] = useState(SentenceDB[id].contents.Sentence.join(' '))
    const [sentenceName, setSentenceName] = useState(SentenceDB[id].SentenceName)
    const append = () => {
        if (sentenceName == '' || sentence == ''){
            alert('문장의 제목이나 내용을 입력하세요')
        }
        else {
            AppendSentence(id,sentenceName,sentence.split(' '))
            navigate('/sentence')
            console.log(SentenceDB)
        }
    }
    return(
        <div>
            <Top>
                <Top>
                    <TitleName onClick={() => navigate('/sentence')}>⬅️</TitleName>
                    <p style={{padding:"5px"}}></p>
                    <TitleName>수정하기</TitleName>
                </Top>
                <p onClick={append} >수정</p>
            </Top>
            <WordInput value={sentenceName} onChange={(e) => setSentenceName(e.target.value)} type="text" placeholder="문장의 이름을 입력하세요"/>
            <TextInputArea value={sentence} onChange={(e) => setSentence(e.target.value)} rows="20" cols="39" placeholder="이곳에 글을 입력하세요"/>
        </div>
    )
}
export const TextInputArea = styled.textarea`
    width: 43vh;
    background-color: #2b2b2b;
    color: white;
    height: 50vh;
    border-radius: 15px;
    border: 0px;
    padding: 3px;
    padding-left: 10px;
    font-size: 16px;
    margin-bottom: 2vh;
    padding-top: 10px;
`
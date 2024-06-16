import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import TitleName from "../ui/Title";
import Top from "../ui/Top";
import { Detail, Word, WordText } from "../VocaTab/VocaElement";
import styled from "styled-components";
import { useState } from "react";

const SentenceDB={
    "66736108-c769-42da-b0c6-64ef05e7b34f":{
        SentenceName:"테스트용 문장",
        contents:{
            Sentence:["이것은","테스트용","문장입니다.","리엑트"],
            blind:[true,false,false,true]
        }
    }
}
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
            </Routes>
        </div>
    )
}
function SentenceDetail(){
    const location = useLocation()
    const id = location.state
    const navigate = useNavigate();
    console.log(SentenceDB[id].SentenceName)
    return(
        <div style={{color:"white", marginTop:'1vh'}}>
            <Top>
                <TitleName onClick={() => navigate('/Sentence')}>⬅️</TitleName>
                <TitleName>{SentenceDB[id].SentenceName}</TitleName>
                <div style={{color:'white'}} onClick={() => {}}>
                ✐
                </div>
            </Top>
            {Object.keys(SentenceDB[id].contents.blind).map(key => (
                <div style={{display:"inline"}}>
                    <WordElementComp blind={SentenceDB[id].contents.blind[key]} contents={SentenceDB[id].contents.Sentence[key]}/>
                    <p style={{display:"inline",userSelect: 'none'}}> </p>
                </div>
            ))}

        </div>
    )
}
function Sentence(){
    const navigate = useNavigate();
    return(
        <div>
            <Top>
                <TitleName>문장노트</TitleName>
                <p onClick={() => {}} style={{fontSize:'30px',fontWeight:'800',margin:'0px'}}>+</p>
            </Top>
            {Object.keys(SentenceDB).map(key => (
                <SentenceElement SentenceName={SentenceDB[key].SentenceName} keyValue={key} />
            ))}
        </div>
    )
}
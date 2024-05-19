import React, { useEffect, useState } from "react";
import Top from "../ui/Top";
import TitleName from "../ui/Title";
import styled from "styled-components";
import { v4 } from "uuid";
import { WordAppend } from "./MainPage";
import { useNavigate } from "react-router-dom";
function Append(props) {
    const [word,setWord] = useState('')
    const [mean,setMean] = useState('')
    const [desc,setDesc] = useState('')
    const [pron,setPron] = useState('')
    const navigate = useNavigate();
    useEffect(() => (
        console.log(word,mean,desc,pron)
    ),[word,mean,desc,pron])
    return(
        <div style={{width :'45vh'}}>
            <Top>
                <TitleName onClick={() => navigate('/')}>⬅️</TitleName>
                <p onClick={() => {
                    WordAppend(v4(),word,mean,pron,desc)
                    setDesc('')
                    setMean('')
                    setPron('')
                    setWord('')
                    }}>저장하기</p>
            </Top>
            <WordInput value={word} onChange={(e) => setWord(e.target.value)} placeholder="단어를 입력하세요"/>
            <WordInput value={mean} onChange={(e) => setMean(e.target.value)} placeholder="뜻을 입력하세요"/>
            <WordInput value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="설명을 입력하세요"/>
            <WordInput value={pron} onChange={(e) => setPron(e.target.value)} placeholder="발음을 입력하세요"/>
        </div>
    )   
}
export const WordInput = styled.input`
    width: 43vh;
    background-color: #2b2b2b;
    color: white;
    height: 5vh;
    border-radius: 15px;
    border: 0px;
    padding: 3px;
    padding-left: 10px;
    font-size: 16px;
    margin-bottom: 2vh;
`

export default Append
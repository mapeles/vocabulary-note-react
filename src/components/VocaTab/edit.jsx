import React, { useEffect, useState } from "react";
import Top from "../ui/Top";
import TitleName from "../ui/Title";
import styled from "styled-components";
import { v4 } from "uuid";
import { DeleteWord, WordAppend, getWord } from "./MainPage";
import { useLocation, useNavigate } from "react-router-dom";
function Edit(props) {
    const location = useLocation()
    const id = location.state

    const voca = getWord(id)
    console.log(voca)
    const [word,setWord] = useState(voca.word)
    const [mean,setMean] = useState(voca.mean)
    const [desc,setDesc] = useState(voca.desc)
    const [pron,setPron] = useState(voca.pron)
    const navigate = useNavigate();
    useEffect(() => (
        console.log(word,mean,desc,pron)
    ),[word,mean,desc,pron])
    const append = () => {
        if (word == '' || mean == ''){
            alert('단어와 뜻을 입력하세요')
        }
        else {
            WordAppend(id,word,mean,pron,desc,voca.score)
            navigate('/')
        }
    }
    const Delete = () => {
        // eslint-disable-next-line no-restricted-globals
        const isDelete= confirm("단어을 삭제하시겠습니까?")
        if (isDelete){
            DeleteWord(id)
            navigate('/')
        }
        
    }
    return(
        <div style={{width :'45vh'}}>
            <Top>
                <TitleName onClick={() => navigate('/')}>⬅️</TitleName>
                <div style={{display:'flex', flexDirection: 'row', justifyContent:'space-between', width:'10vh'}}>
                    <p onClick={Delete}>삭제</p>
                    <p onClick={append}>저장</p>
                </div>
            </Top>
            <WordInput value={word} onChange={(e) => setWord(e.target.value)} placeholder="단어를 입력하세요"/>
            <WordInput value={mean} onChange={(e) => setMean(e.target.value)} placeholder="뜻을 입력하세요"/>
            <WordInput value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="설명을 입력하세요(선택)"/>
            <WordInput value={pron} onChange={(e) => setPron(e.target.value)} placeholder="발음을 입력하세요(선택)"/>
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

export default Edit
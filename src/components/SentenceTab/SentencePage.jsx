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
    },
    "ㄴㄷㅅㅅㄴㄷ":{
    "SentenceName": "2024 고1 9월 모의고사",
    "contents": {
        "Sentence": [
            "",
            "#no",
            "무대에",
            "오른",
            "모든",
            "배우들은",
            "연기에",
            "집중했습니다.",
            "#no",
            "",
            "#enter",
            "All",
            "the",
            "actors",
            "on",
            "the",
            "stage",
            "were",
            "focused",
            "on",
            "their",
            "acting.",
            "#enter",
            "",
            "#enter",
            "",
            "#no",
            "그러던",
            "중",
            "갑자기",
            "아서가",
            "무대",
            "구석에",
            "떨어졌습니다.",
            "#no",
            "",
            "#enter",
            "Then,",
            "suddenly,",
            "Arthur",
            "fell",
            "into",
            "thecorner",
            "of",
            "the",
            "stage.",
            "",
            "#enter",
            "",
            "#enter",
            "",
            "#no",
            "지반은",
            "즉시",
            "아서에게",
            "다가갔고",
            "그의",
            "심장이",
            "뛰고",
            "있지",
            "않다는",
            "것을",
            "알게",
            "되었습니다.",
            "#no",
            "",
            "#enter",
            "Jeevan",
            "immediately",
            "approached",
            "Arthur",
            "and",
            "found",
            "his",
            "heart",
            "wasn’t",
            "beating.",
            "#enter",
            "",
            "#enter",
            "",
            "#no",
            "지반은",
            "심폐소생술을",
            "시작했습니다.",
            "#no",
            "",
            "#enter",
            "Jeevan",
            "began",
            "CPR.",
            "",
            "#enter",
            "",
            "#enter",
            "",
            "#enter",
            "",
            "#enter",
            "",
            "#enter",
            ""
        ]
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
function DeleteSentence(id){
    delete SentenceDB[id]
} 
/*

채점기능에서 특수기호를 스킵하는거를 만드는게 나을듯?
망각곡선
(완)삭제 얼러트

*/
function WordElementComp(props){
    const [blind, setBlind] = useState(props.blind)
    return(
        <div style={{ display: "inline" }}>
            {props.contents === '#enter' ? (
                <div></div>
            ) : props.contents === '#no' ? (
                <div> </div>
            ) : (
                <WordElement blind={blind} onClick={() => setBlind(!blind)}>
                {props.contents}
                </WordElement>
            )}
        </div>
    )
}
function WordTestElementComp(props){
    const [blind, setBlind] = useState(props.blind)
    return(
        <div style={{ display: "inline" }}>
            {props.contents === '#enter' ? (
                <div></div>
            ) : props.contents === '#no' ? (
                <div> </div>
            ) : blind && props.contents ?(
                <input size={props.contents.length} placeholder={props.contents}></input>
            ) : <WordElement>{props.contents}</WordElement>}
        </div>
    )
}
const WordElement = styled.p`
    &:hover {cursor: pointer;}
    user-select: none;
    display: inline;
    background-color: ${(props) => (
    props.blind ?
     `#808080` : 
     `null`
    )};
    color: ${(props) => (
    props.blind ?
     `#808080` : 
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
                <Route path="/Detail/Test" element={<SentenceTest/>}/>
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
    let tag = false
    for (let i = 0; i < SentenceDB[id].contents.Sentence.length; i++) {
        if (SentenceDB[id].contents.Sentence[i] == '#no'){
            tag = !tag
            console.log('test, yes')
        }
        if (tag == false){
            blind.push(true);
        }
        else{
            blind.push(false);
        }
        console.log(SentenceDB[id].contents.Sentence[i],'te')
    }
    console.log(blind)
    return(
        <div style={{color:"white", marginTop:'1vh'}}>
            <Top>
                <TitleName onClick={() => navigate('/Sentence')}>⬅️</TitleName>
                <TitleName>{SentenceDB[id].SentenceName}</TitleName>
                <div>
                    <div style={{color:'white'}} onClick={() => navigate("Edit/", {state:id})}>
                    ✐
                    </div>
                </div>
            </Top>
            <div style={{lineHeight:"150%"}}>
                <Scrollable>
                    {Object.keys(SentenceDB[id].contents.Sentence).map(key => (
                        <div style={{display:"inline"}}>
                            <WordElementComp blind={blind[key]} contents={SentenceDB[id].contents.Sentence[key]}/>
                            <p style={{display:"inline",userSelect: 'none'}}> </p>
                        </div>
                    ))}
                </Scrollable>
            </div>
        </div>
    )
}
function SentenceTest(){
    const navigate = useNavigate();
    const location = useLocation()
    const id = location.state.id
    const blind = location.state.blind
    console.log(SentenceDB[id].contents.Sentence)
    return(
        <div style={{color:"white", marginTop:'1vh'}}>
            <Top>
                <TitleName onClick={() => navigate('/Sentence/Detail',{state:id})}>⬅️</TitleName>
                <TitleName>{SentenceDB[id].SentenceName}</TitleName>
                <div style={{color:'white'}} onClick={()=>{}}>
                제출
                </div>
            </Top>
            <div style={{lineHeight:"150%"}}>
                <Scrollable>
                    {Object.keys(SentenceDB[id].contents.Sentence).map(key => (
                        <div style={{display:"inline"}}>
                            <WordTestElementComp blind={blind[key]} contents={SentenceDB[id].contents.Sentence[key]}/>
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
            <Scrollable>
                {Object.keys(SentenceDB).map(key => (
                    <SentenceElement SentenceName={SentenceDB[key].SentenceName} keyValue={key} />
                ))}
            </Scrollable>
        </div>
    )
}

function AppendSentencePage(){
    const navigate = useNavigate();
    const [sentence, setSentence] = useState('')
    const [sentenceName, setSentenceName] = useState('')
    const appendSentence = () => {
        if (sentenceName == '' || sentence == ''){
            alert('문장의 제목이나 내용을 입력하세요')
        }
        else {
            var str
            str = sentence
            str = str.replace(/(?:\r\n|\r|\n)/g, ' #enter ');
            str = str.replace(/@/g, ' #no ');
            AppendSentence(v4(),sentenceName,str.split(' '))

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
                <p onClick={appendSentence} >추가</p>
            </Top>
            <WordInput value={sentenceName} onChange={(e) => setSentenceName(e.target.value)} type="text" placeholder="문장의 이름을 입력하세요"/>
            <TextInputArea value={sentence} onChange={(e) => setSentence(e.target.value)} rows="20" cols="39" placeholder="이곳에 글을 입력하세요&#13;&#10;'@' 사이에 글을 입력하면&#13;&#10; 가려지지 않습니다"/>
        </div>
    )
}
function EditSentence(){
    const location = useLocation()
    const id = location.state
    const navigate = useNavigate();
    var str = SentenceDB[id].contents.Sentence.join(' ')
    str = str.replace(/ #enter /g,'\n')
    str = str.replace(/ #no /g, '@');
    console.log(str)
    const [sentence, setSentence] = useState(str)
    const [sentenceName, setSentenceName] = useState(SentenceDB[id].SentenceName)
    const appendSentence = () => {
        if (sentenceName == '' || sentence == ''){
            alert('문장의 제목이나 내용을 입력하세요')
        }
        else {
            var str
            str = sentence
            str = str.replace(/(?:\r\n|\r|\n)/g, ' #enter ');
            str = str.replace(/@/g, ' #no ');
            AppendSentence(id,sentenceName,str.split(' '))

            navigate('/sentence')
            console.log(SentenceDB)
        }
    }
    const deletefun = () => {
        // eslint-disable-next-line no-restricted-globals
        const isDelete= confirm("문장을 삭제하시겠습니까?")
        if (isDelete){
            DeleteSentence(id)
            navigate('/sentence')
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
                <Top>
                    <p onClick={deletefun}>삭제</p>
                    <p style={{padding:"5px"}}></p>
                    <p onClick={appendSentence} >수정</p>
                </Top>
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
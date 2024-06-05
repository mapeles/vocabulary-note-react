import { Route, Routes, useNavigate } from "react-router-dom";
import TitleName from "../ui/Title";
import Top from "../ui/Top";
import { Detail, Word, WordText } from "../VocaTab/VocaElement";

const SentenceDB={
    "66736108-c769-42da-b0c6-64ef05e7b34f":{
        SentenceName:"테스트용 문장",
        contents:{
            Sentence:["이것은",,"테스트용","문장입니다.","리엑트"],
            blind:[true,false,false,true]
        }
    }
}
function SentenceElement(props) {
    return (
        <Word>
          <Detail>
            <WordText>{props.SentenceName}</WordText>
          </Detail>
        </Word>
      )
}

export function SentencePage(){
    return(
        <div style={{height:'100%'}}>
            <Routes>
                <Route path="/" element={<Sentence/>}/>
            </Routes>
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
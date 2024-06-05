import TitleName from "../ui/Title";
import { useNavigate } from 'react-router-dom';
import { Scrollable, WordDB, setNote } from "./MainPage";
import { useState } from "react";
import Top from "../ui/Top";
import { WordInput } from "./Append";
import { NoteAppend } from "./MainPage";
import { v4 } from "uuid";
import { currentVoca } from "./MainPage";
import { Word, Detail, WordText } from "./VocaElement";;

export function SelectNote() {
  const navigate = useNavigate();
  return (
    <div style={{ width: '45vh' }}>
      <div style={{ color: "white", display: "flex", flexDirection: 'row', justifyContent: "space-between" }}>
        <div style={{ color: 'white', display: 'flex', flexDirection: 'row' }}>
          <TitleName onClick={() => navigate('/')}>⬅️</TitleName>
          <div style={{ width: '10px' }}></div>
          <TitleName>단어장 선택하기</TitleName>
        </div>
        <div style={{ color: "white", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p onClick={() => navigate('/appendNote')}>추가</p>
        </div>
      </div>
      <Scrollable>
        {Object.keys(WordDB).map(key => (
          <NoteElement noteName={WordDB[key].VocaName} keyValue={key} />
        ))}
      </Scrollable>
    </div>
  );
}
export function AppendNote() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const append = () => {
    if (name === '') {
      alert('단어장의 이름을 입력하세요')
    }
    else {
      NoteAppend(v4(), name)
      navigate('/selectNote')
    }
  }
  return (
    <div>
      <Top>
        <TitleName onClick={() => navigate('/')}>⬅</TitleName>
        <p onClick={append}>저장하기</p>
      </Top>
      <WordInput value={name} onChange={(e) => setName(e.target.value)} placeholder="단어장의 이름를 입력하세요" />
    </div>
  )
}

export function NoteElement(props) {
  const navigate = useNavigate()
  const key = props.keyValue
  const clicked = () => {
    setNote(key)
    navigate('/')
  }
  return (
    <Word onClick={clicked}>
      <Detail>
        <WordText>{props.noteName}</WordText>
      </Detail>
    </Word>
  )
}


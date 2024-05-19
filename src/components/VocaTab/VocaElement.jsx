import { useState } from "react"
import styled from "styled-components"

function VocaElement(props) {
    const {word,mean} = props
    return(
        <Word>
            <WordDetail word={word} mean={mean} />
        </Word>
    )
}

function WordDetail(props) {
    const [display,setDisplay] = useState(false)
    return(
      <Detail onClick={() => setDisplay(!display)}>
        <WordText>{props.word}</WordText>
        {display ? <p>{props.mean}</p> : null}
      </Detail>
    )
}

const WordText = styled.h1`
  font-size: 24px;
`
const Detail = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding-left: 20px;
`
const Word = styled.div`
  background-color: #2B2B2B;
  width: 45vh;
  border-radius: 10px;
  margin-top: 2vh;
`

export default VocaElement
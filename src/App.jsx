import { useState } from 'react';
import styled from 'styled-components'
import Voca from './components/VocaTab/MainPage';
import { BottomTab } from './components/ui/bottomTab';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SentencePage } from './components/SentenceTab/SentencePage';

function App() {
  return (
    <Main>
      <MainContentBorder>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Voca/>}/>
            <Route path="/Sentence/*" element={<SentencePage/>}/>
          </Routes>
          <BottomTab/>
        </BrowserRouter> 
      </MainContentBorder>
    </Main>
  );
}


const Main = styled.div`
  background-color: #131414;
  width: 100vw;
  height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;

`
const MainContentBorder = styled.div`
  background-color: #131414;
  width: 45vh;
  height: 95vh;
  display: flex;
  justify-content: center;
  flex-direction: column;

`
export default App;

import { useState } from 'react';
import styled from 'styled-components'
import Voca from './components/VocaTab/MainPage';

function App() {
  return (
    <Main>
      <MainContent>
        <Voca/>
      </MainContent>
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
const MainContent = styled.div`
  background-color: #131414;
  width: 53.4375vh;
  height: 95vh;
  display: flex;
  justify-content: center;

`
export default App;

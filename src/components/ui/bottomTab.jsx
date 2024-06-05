import { useNavigate } from "react-router-dom";
import styled from "styled-components"

export function BottomTab() {
    const navigate = useNavigate();
    return(
        <Bottom>
            <div onClick={() => navigate('/')}>
                <TabElement icon="fa-solid fa-house" name="단어"/>
            </div>
            <div onClick={() => navigate('/Sentence')}>
                <TabElement icon="fa-solid fa-book" name="문장"/>
            </div>
        </Bottom>
    )
}
function TabElement(props){
    return(
        <div style={{display: "flex", flexDirection:"column", padding:"10px",alignItems:"center"}}>
            <i class={props.icon} style={{color:'white', fontSize:"14px"}}></i>
            <p style={{color: "white", margin:"0px", marginTop:"5px", fontSize:"10px"}}>{props.name}</p>
        </div>
    )
}
const Bottom = styled.div`
    display: flex;
    background-color: #131314;
    justify-content: space-around;
    flex: 1 0 0;
`
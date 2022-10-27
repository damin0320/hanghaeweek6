import React from 'react'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { __userLogout } from '../redux/modules/LoginSlice';

const Header = () => {
  const dispatch = useDispatch()
  const navigator = useNavigate();
  const onLogoutHandler = () => {
    dispatch(__userLogout())
    alert("이용하시려면 다시 로그인 해주세요")
    window.location.replace("/")
  }
  


  return (
    <HeadContainer>
     <BtnBox>
        <Button onClick={onLogoutHandler}>Logout</Button>
        <Button onClick={()=>{navigator("/addmovie")}}>Write</Button>
        <Button onClick={()=>{navigator("/movielist")}}>Main</Button>
      </BtnBox>
    </HeadContainer>
  )
}

export default Header;

const HeadContainer = styled.section`
  grid-column: 1 / 4;
  grid-row: 1 / 2;
  width: 100%;
  height: 40px;
  background-color: #e50913;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: fixed;
  top:0;
  left: 0;
  // box-shadow: 0px 2px 10px #9dabca;
`

const Button = styled.button`
  border:none;
  width:80px;
  background-color:transparent;
  margin:0 5px;
  color:#fff;
  font-weight:600;
  font-size:14px;
  cursor:pointer;
`
const BtnBox =styled.div`

`
import React from 'react'
import styled from "styled-components";
import { getCookie, delCookie } from '../cookie/cookie'
import { IoMdHome, IoLogoGithub } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigator = useNavigate();
  const onLogoutHandler = () => {
    delCookie("Access_Token")
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
const Logo = styled.div`
  
`
const HeadLeft = styled.a`
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  .head-ico {
  font-size: 1.6rem;
  margin: 5px;
  color: white;
  background-color: transparent;
  height: 40px;
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

const Div = styled.div`
  background-color: transparent;
  font-weight: 400;
  line-height: 4;
`


const HeadRight1 = styled.a`
  font-size: 0.8rem;
  font-weight: 600;
  align-content: center;
  background-color: transparent;
  line-height: 0.2;
  display: flex;
  align-items: center;
  `

const HeadRight2 = styled.button`
font-size: 0.9rem;
width: 30px;
height: 40px;
color: #00251a;
border: 0;
cursor: pointer;
font-weight: 600;
background-color: transparent;
justify-content: center;
.head-ico {
  font-size: 1.6rem;
  margin: 5px;
  color: white;
  background-color: transparent;
}
`
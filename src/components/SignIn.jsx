import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {__userLogin} from "../redux/modules/LoginSlice"
// {}로 감싸주기(actions 함수 써야하니까)

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const initialState = {
    userid: "",
    password: "",
  };
  const [login, setLogin] = useState(initialState);
  const onChangeHandler = (event) => {
    const {name, value} = event.target
    setLogin({...login, [name] : value})
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    const obj = {
      id : 1,
      //임시
      userid: login.userid,
      password: login.password,
    }
    dispatch(__userLogin(obj))
    
  }

  return (
    
    <Bg>
    <Stcontainer>
    <H2>DoDoong</H2>
    <P>로그인</P>
    <div>
      <div><Input type="text" name="userid" value={login.userid} placeholder='아이디' onChange={onChangeHandler} /></div>
      <div><Input type="password" name="password" value={login.password} placeholder='비밀번호' onChange={onChangeHandler} /></div>
    </div>
    <Button1 onClick={onSubmitHandler}>로그인</Button1>
    <Button2 type="submit" onClick={() => {navigate("/signup");}}><Span>회원이 아니신가요? &nbsp;&nbsp;</Span>가입하기</Button2>
    </Stcontainer>
    </Bg>
  )
}

export default SignIn

const Bg =styled.div`
  position:relative;
  min-height: 100vh;
  min-width: 100vw;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 1.2), 
  rgba(0, 0, 0, 0.5)), url("https://help.nflxext.com/43e0db2f-fea0-4308-bfb9-09f2a88f6ee4_what_is_netflix_1_en.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
`
const Stcontainer = styled.div`
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  padding-left:50px;
  padding-top:20px;
  background-color:#000;
  margin: 0 auto;
  width:600px;
  height:450px;
  justify-content: center;
`
const P = styled.h1`
  color: #fff;
  font-size:40px;
  margin:20px 0;
`
const H2 = styled.h2`
  color:#e50913;
`
const Input = styled.input`
  border:none;
  background-color:#434343;
  color:#fff;
  width:500px;
  height:50px;
  text-indent:20px;
  margin-top:20px;
`
const Button1 = styled.button`
  border:none;
  background-color:#e50913;
  width:504px;
  height:60px;
  box-sizing: border-box;
  color:#fff;
  font-size:16px;
  font-weight:600;
  margin-top:30px;
  margin-bottom:10px;
`
const Button2 = styled.button`
  border:none;
  background-color:#000;
  color: #fff;
  font-size:13px;
  cursor:pointer;
`
const Span = styled.span`
  color:#777;
`
import React from 'react'
import { useNavigate } from 'react-router-dom'
const SignIn = () => {
  const navigate = useNavigate()
  return (
    <div>
    <h1>로그인</h1>
    <div><input placeholder='아이디'></input></div>
    <div><input placeholder='비밀번호'></input></div>
    <button onClick={() => {
            navigate("/movielist");
          }}>로그인</button>
    <button onClick={() => {
            navigate("/signup");
          }}>회원가입</button>

    </div>
  )
}

export default SignIn
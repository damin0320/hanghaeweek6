import React from 'react'
import { useNavigate } from 'react-router-dom'


const SignUp = () => {
  const navigate = useNavigate()
  return (
    <div>    
    <h1>회원가입</h1>
    <div><input placeholder='아이디'></input> <button>중복확인</button></div>
    <div><input placeholder='닉네임'></input> <button>중복확인</button></div>
    <div><input placeholder='비밀번호'></input></div>
    <div><input placeholder='비밀번호 확인'></input></div>
    <div>    <button onClick={() => {
            navigate("/movielist");
          }}>회원가입</button>    <button onClick={() => {
            navigate("/");
          }}>뒤로가기</button></div>
    </div>
  )
}

export default SignUp
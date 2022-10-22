import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {__userLogin} from "../redux/modules/LoginSlice"
// {}로 감싸주기(actions 함수 써야하니까)

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const initialState = {
    userId: "",
    password: "",
  };
  const [member, setMember] = useState(initialState);
  const onChangeHandler = (event) => {
    const {name, value} = event.target
    setMember({...member, [name] : value})
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    const obj = {
      id : 1,
      //임시
      userId: member.userId,
      password: member.password,
    }
    dispatch(__userLogin(obj))
    
  }

  return (
    <div>
    <h1>로그인</h1>
    <div><input name="userId" value={member.userId} placeholder='아이디' onChange={onChangeHandler}></input></div>
    <div><input name="password" value={member.password} placeholder='비밀번호' onChange={onChangeHandler}></input></div>
    <button onClick={onSubmitHandler}>로그인</button>
    <button type="submit" onClick={() => {
            navigate("/signup");
          }}>회원가입</button>

    </div>
  )
}

export default SignIn
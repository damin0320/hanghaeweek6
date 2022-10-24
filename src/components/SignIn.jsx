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
    <div>
    <h1>로그인</h1>
    <div><input name="userid" value={login.userid} placeholder='아이디' onChange={onChangeHandler}></input></div>
    <div><input name="password" value={login.password} placeholder='비밀번호' onChange={onChangeHandler}></input></div>
    <button onClick={onSubmitHandler}>로그인</button>
    <button type="submit" onClick={() => {
            navigate("/signup");
          }}>회원가입</button>

    </div>
  )
}

export default SignIn
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { __userSignUp, __userSignUpGet } from '../redux/modules/LoginSlice'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {account} = useSelector((state) => state.account)
  useEffect(() => {dispatch(__userSignUpGet())
  }, [dispatch])

  const initialState = {
    userId: "",
    nickname: "",
    password: "",
    password2: "",    
  };
  const [join, setJoin] = useState(initialState);
  const onChangeHandler = (event) => {
    const {name, value} = event.target
    setJoin({...join, [name] : value})
  }
  const obj = {
    id : 1,
    //임시
    userId: join.userId,
    nickname: join.nickname,
    password: join.password,
    password2: join.password2,
  }

const onCheckUserId = () => {
  account.map((item) => {
    if(obj.userId === item.userId) {
      return alert("사용 중인 ID가 있습니다.")
    }else{
      return alert("사용 가능합니다.")
    }
  })
  
}
const onCheckNicknameId = () => {
  account.map((item) => {
    if(obj.nickname === item.nickname) {
      return alert("사용 중인 닉네임이 있습니다.")
    }else{
      return alert("사용 가능합니다.")
    }
  })
}

  const onSubmitHandler = (event) => {
    event.preventDefault()
    if(obj.password !== obj.password2){
      return alert("비밀번호를 모두 확인해주세요")
    }
    if(obj.password === "" || obj.password2 === "" || obj.password === undefined || obj.password2 === undefined){
      return alert("빈칸을 입력해주세요.")
    }
    if(obj.userId === "" || obj.userId === undefined) {
      return alert("빈칸을 입력해주세요.")
    }

    if(obj.nickname === "" || obj.nickname === undefined) {
      return alert("빈칸을 입력해주세요.")
    }
    dispatch(__userSignUp(obj))
    alert("회원가입이 완료되었습니다.")
    navigate("/");
  }

  return (
    <div>    
    <h1>회원가입</h1>
    <div><input name='userId' placeholder='아이디' onChange={onChangeHandler}></input> <button type="button" onClick={onCheckUserId}>중복확인</button></div>
    <div><input name='nickname' placeholder='닉네임' onChange={onChangeHandler}></input> <button type="button" onClick={onCheckNicknameId}>중복확인</button></div>
    <div><input name='password' placeholder='비밀번호' onChange={onChangeHandler}></input></div>
    <div><input name='password2' placeholder='비밀번호 확인' onChange={onChangeHandler}></input></div>
    <div>    <button onClick={onSubmitHandler}>회원가입</button>    <button onClick={() => {
            navigate("/");
          }}>뒤로가기</button></div>
    </div>
  )
}

export default SignUp
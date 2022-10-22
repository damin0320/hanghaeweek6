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

const userIdCheck = /^[a-z]+[a-z0-9]{5,19}$/g;
const usernicknameCheck = /^[a-z]+[a-z0-9]{5,19}$/g;
const passwordCheck = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;

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
    if(!userIdCheck.test(obj.userId)){
      return alert("아이디 양식에 맞춰주세요")
    }
    if(!usernicknameCheck.test(obj.nickname)){
      return alert("닉네임 양식에 맞춰주세요")
    }
    if(!passwordCheck.test(obj.password)){
      return alert("비밀번호 양식에 맞춰주세요")
    }
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
    <div><input style={{width:300}} name='userId' onChange={onChangeHandler} placeholder="아이디는 영문자로 시작하는 영문자 또는 숫자 6~20자"></input> <button type="button" onClick={onCheckUserId}>중복확인</button></div>
    <div><input style={{width:300}} name='nickname' onChange={onChangeHandler} placeholder="닉네임은 영문자로 시작하는 영문자 또는 숫자 6~20자"></input> <button type="button" onClick={onCheckNicknameId}>중복확인</button></div>
    <div><input style={{width:300}} name='password' onChange={onChangeHandler} placeholder="비밀번호는 8 ~ 16자 영문, 숫자 조합
"></input></div>
    <div><input style={{width:300}} name='password2' placeholder='비밀번호 확인' onChange={onChangeHandler}></input></div>
    <div>    <button onClick={onSubmitHandler}>회원가입</button>    <button onClick={() => {
            navigate("/");
          }}>뒤로가기</button></div>
    </div>
  )
}

export default SignUp
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { __userSignUp, __checkId, __checkName } from '../redux/modules/LoginSlice'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {account, idCheck, nameCheck} = useSelector((state) => state.account)


  const initialState = {
    userid: "",
    nickname: "",
    password: "",
    passwordconfirm: "",    
  };
  const [join, setJoin] = useState(initialState);
  const onChangeHandler = (event) => {
    const {name, value} = event.target
    setJoin({...join, [name] : value})
  }
  const obj = {
    id : 1,
    //임시
    userid: join.userid,
    nickname: join.nickname,
    password: join.password,
    passwordconfirm: join.passwordconfirm,
  }

const useridCheck = /^[a-z]+[a-z0-9]{5,19}$/g;
const usernicknameCheck = /^[a-z]+[a-z0-9]{5,19}$/g;
const passwordCheck = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;

const onCheckId = () => {
  // 수정 필요(true, false로만 받으면 됨. if 필요 없음. dispatch로 받으면 됨)
  dispatch(__checkId(obj.userid))
}

useEffect(() => {
  if(idCheck !== undefined){
    if(idCheck.success === true){
      return alert("사용 가능한 ID입니다.")
    }else{
      return alert("이미 사용중인 ID가 있습니다.")
    }
  }
}, [dispatch, idCheck])
const onCheckname = () => {
  dispatch(__checkName(obj.nickname))
}
useEffect(() => {
  if(nameCheck !== undefined){
    if(nameCheck.success === true){
      return alert("사용 가능한 닉네임입니다.")
    }else{
      return alert("이미 사용중인 닉네임이 있습니다.")
    }
  }
}, [dispatch, nameCheck])


  const onSubmitHandler = (event) => {
    event.preventDefault()
    if(!useridCheck.test(obj.userid)){
      return alert("아이디 양식에 맞춰주세요")
    }
    if(!usernicknameCheck.test(obj.nickname)){
      return alert("닉네임 양식에 맞춰주세요")
    }
    if(!passwordCheck.test(obj.password)){
      return alert("비밀번호 양식에 맞춰주세요")
    }
    if(obj.password !== obj.passwordconfirm){
      return alert("비밀번호를 모두 확인해주세요")
    }
    if(obj.password === "" || obj.passwordconfirm === "" || obj.password === undefined || obj.passwordconfirm === undefined){
      return alert("빈칸을 입력해주세요.")
    }
    if(obj.userid === "" || obj.userid === undefined) {
      return alert("빈칸을 입력해주세요.")
    }

    if(obj.nickname === "" || obj.nickname === undefined) {
      return alert("빈칸을 입력해주세요.")
    }

    dispatch(__userSignUp(obj))

  }
  useEffect(() => {
    if(account !== undefined){
    if(account.success === true){
      alert("회원가입이 완료되었습니다.")
      setJoin({
        userid: "",
        nickname: "",
        password: "",
        passwordconfirm: "",  
      })
        window.location.replace("/")
    }else{
      if(account.error !== undefined){
        alert(account.error)
      }
     }
  }
  }, [account])

  return (
    <div>    
    <h1>회원가입</h1>
    <div><input style={{width:300}} name='userid' onChange={onChangeHandler} placeholder="아이디는 영문자로 시작하는 영문자 또는 숫자 6~20자"></input> <button type="button" onClick={onCheckId}>중복확인</button></div>
    <div><input style={{width:300}} name='nickname' onChange={onChangeHandler} placeholder="닉네임은 영문자로 시작하는 영문자 또는 숫자 6~20자"></input> <button type="button" onClick={onCheckname}>중복확인</button></div>
    <div><input style={{width:300}} name='password' onChange={onChangeHandler} placeholder="비밀번호는 8 ~ 16자 영문, 숫자 조합
"></input></div>
    <div><input style={{width:300}} name='passwordconfirm' placeholder='비밀번호 확인' onChange={onChangeHandler}></input></div>
    <div>    <button onClick={onSubmitHandler}>회원가입</button>    <button onClick={() => {
            navigate("/");
          }}>뒤로가기</button></div>
    </div>
  )
}

export default SignUp
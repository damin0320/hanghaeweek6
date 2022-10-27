import React from 'react'
import styled from 'styled-components'
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
    <Bg>
    <Stcontainer>    
    <H2>DoDoong</H2>  
    <P>회원가입</P>
    <div><Input type="text" name='userid' onChange={onChangeHandler} placeholder="아이디는 영문자로 시작하는 영문자 또는 숫자 6~20자" /> <Button type="button" onClick={onCheckId}>중복확인</Button></div>
    <div><Input type="text" name='nickname' onChange={onChangeHandler} placeholder="닉네임은 영문자로 시작하는 영문자 또는 숫자 6~20자" /> <Button type="button" onClick={onCheckname}>중복확인</Button></div>
    <div><Input type="password" name='password' onChange={onChangeHandler} placeholder="비밀번호는 8 ~ 16자 영문, 숫자 조합" /></div>
    <div><Input type="password" name='passwordconfirm' placeholder='비밀번호 확인' onChange={onChangeHandler} /></div>
    <div><Button2 onClick={onSubmitHandler}>회원가입</Button2><Button3 onClick={() => {navigate("/");}}>뒤로가기</Button3></div>
    </Stcontainer>
    </Bg>
  )
}

export default SignUp

const Bg =styled.div`
  position:relative;
  min-height: 100vh;
  min-width: 100vw;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 2.0), 
  rgba(0, 0, 0, 0.5)), url("https://help.nflxext.com/43e0db2f-fea0-4308-bfb9-09f2a88f6ee4_what_is_netflix_1_en.png");
  background-repeat: repeat-no-repeat;
  background-position: top center;
  background-size: cover;
  background-attachment: fixed;
`

const Stcontainer=styled.div`
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  padding-left:50px;
  padding-top:20px;
  background-color:#000;
  margin: 0 auto;
  width:600px;
  height:550px;
`
const H2 = styled.h2`
  color:#e50913;
`
const P = styled.h1`
  color: #fff;
  font-size:40px;
  margin:20px 0;
`
const Input = styled.input`
  border:none;
  background-color:#434343;
  color:#fff;
  width:440px;
  height:50px;
  text-indent:20px;
  margin-top:20px;
`
const Button = styled.button`
  margin-left:10px;
  width:100px;
  height:52px;
  border:none;
  background-color:#e50913;
  color:#fff;
  font-weight:600;
`
const Button2 = styled.button`
  margin-top:20px;
  width:270px;
  height:52px;
  border:none;
  background-color:#e50913;
  color:#fff;
  font-weight:600;
`
const Button3 = styled.button`
  margin-top:20px;
  width:270px;
  height:52px;
  border:none;
  background-color:#e50913;
  color:#fff;
  font-weight:600;
  margin-left:20px;
`

import React from 'react'
import { getCookie, delCookie } from '../cookie/cookie'
const MovieList = () => {
  const onLogoutHandler = () => {
    delCookie("Access_Token")
    alert("이용하시려면 다시 로그인 해주세요")
    window.location.replace("/")
  }
  return (
    <div>
      <button onClick={onLogoutHandler}>로그아웃</button>
      </div>
  )
}

export default MovieList
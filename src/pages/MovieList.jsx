import React from 'react'

const MovieList = () => {
  const onLogoutHandler = () => {
    window.localStorage.clear()
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
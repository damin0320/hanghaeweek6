import React from "react";
import styled from "styled-components";
import '../components/style.css'
import Header from "../components/Header"
import { useDispatch, useSelector } from "react-redux";
import { __addmovies, __getmovies} from "../redux/modules/MoviesSlice"
import { getCookie, delCookie } from '../cookie/cookie'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

  const MovieList = () => {
    
  // const onLogoutHandler = () => {
  //   delCookie("Access_Token")
  //   alert("이용하시려면 다시 로그인 해주세요")
  //   window.location.replace("/")
  // }

  const navigator = useNavigate();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies) 
  useEffect(() => {
    dispatch(__getmovies());
  }, [dispatch]);
  
  return (
    <>
      <Header />
      {/* <div>
        <button onClick={onLogoutHandler}>로그아웃</button>
        <button onClick={()=>{navigator("/addmovie")}}>글쓰기</button>
      </div> */}
      {/* 리스트가 뿌려짐 */}
      <StContainer>
      
          {
            movies.map((movie)=>{
              return (
                <StlistBox onClick={()=>{navigator(`/MovieDetail/${movie.id}`)}} key={movie.id}>
                  <StImagebox>
                    <img src={movie.url} />
                  </StImagebox>
                  <StTextBox>
                  <P1>{movie.title}</P1>
                  <P2>{movie.content}</P2>
                  </StTextBox>
                </StlistBox>
              )
            })
          }
      </StContainer>
    </>
  )

}
export default MovieList
const StContainer = styled.div`
  width:1280px;
  display:flex;
  flex-wrap: wrap;
  margin:0 auto;
  margin-top:120px;
`
const StlistBox = styled.div`
  margin:10px;
  background-color: #161616;
`

const StImagebox = styled.div`
  height:200px;
  background-color:#ddd;
  img {
    width:300px;
    height:200px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
`
const StTextBox = styled.div`
  padding: 12px 5px;
  text-indent:10px;
`
const P1 = styled.p`
  margin:5px 0;
  font-weight:600;
  color:#fff;
`
const P2 = styled.p`
  margin:0;
  color:#fff;
  font-size:14px;
` 
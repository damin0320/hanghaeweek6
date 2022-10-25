import React from "react";
import styled from "styled-components";
import Header from "../components/Header"
import { useDispatch, useSelector } from "react-redux";
import { __addmovies, __getmovies} from "../redux/modules/MoviesSlice"
import { getCookie, delCookie } from '../cookie/cookie'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

  const MovieList = () => {
    
  const onLogoutHandler = () => {
    delCookie("Access_Token")
    alert("이용하시려면 다시 로그인 해주세요")
    window.location.replace("/")
  }

  const navigator = useNavigate();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies) 
    
  useEffect(() => {
    dispatch(__getmovies());
  }, [dispatch]);
  
  return (
    <>
      <Header />
      
      <button onClick={onLogoutHandler}>로그아웃</button>
      
      {/* 리스트가 뿌려짐 */}
      <StContainer>
          {
            movies.map((movie)=>{
              return (
                <StlistBox onClick={()=>{navigator(`/MovieDetail/${movie.id}`)}} key={movie.id}>
                  <StImagebox></StImagebox>
                  <StTextBox>
                  <Ststrong>제목 : {movie.title}</Ststrong>
                  <p>내용 : {movie.content}</p>
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
  margin:0 auto;
  width:1200px;
  margin-top:100px;
  display:flex;
  flex-wrap: wrap;
`
const StlistBox = styled.div`
  width:280px;
  height:300px;
  border: 1px solid #ddd;
  padding:20px 20px;
  margin: 0 20px 20px 0;
`

const StImagebox = styled.div`
  width:280px;
  height:200px;
  background-color:#ddd;
  background-position: center;
  background-size: cover; 
`
const StTextBox = styled.div`
  margin-top:20px;
`
const Ststrong = styled.strong`
  margin-top:10px;
`
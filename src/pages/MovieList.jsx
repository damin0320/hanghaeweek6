import React from "react";
import styled from "styled-components";
import '../components/style.css'
import Header from "../components/Header"
import { useDispatch, useSelector } from "react-redux";
import { __addmovies, __getmovies} from "../redux/modules/MoviesSlice"
import { __userLogout } from "../redux/modules/LoginSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

  const MovieList = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const {movies} = useSelector((state) => state.movies)
  useEffect(() => {
    dispatch(__getmovies());
  }, [movies.length]);
  // 와칭해주는게 지켜보다가 변경이 되면 리렌더링(삭제도 됨)
  
  return (
    <>
      <Header />

      <StContainer>
 
      {movies.length > 0 &&
      // 조건부 렌더링, length가 0 이상이여야만 렌더링(0개일땐 하지 마!)
      (
        <>
          { movies.map((movie)=>{

              return (
                <StlistBox onClick={()=>{navigator(`/MovieDetail/${movie.postid}`)}} key={movie.postid}>
                  <StImagebox>
                    <img src={movie.imgUrl} />
                  </StImagebox>
                  <StTextBox>
                  <P1>{movie.title}</P1>
                  <P2>{movie.content}</P2>
                  </StTextBox>
                </StlistBox>
              )
            })
          }
    </>
      )}
      
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
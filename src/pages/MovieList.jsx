import React, { useState} from "react";
import styled from "styled-components";
import Header from "../components/Header"
import { useDispatch, useSelector } from "react-redux";
import { __addmovies, __getmovies} from "../redux/modules/MoviesSlice"
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

  
  const MovieList = () => {
  const navigator = useNavigate();
  
  const dispatch = useDispatch();
  const {id}= useParams();
  const movies = useSelector((state) => state.movies.movies) 
    console.log("무비스",movies)
  
  useEffect(() => {
    dispatch(__getmovies(id));
  }, [dispatch]);
  
  return (
    <>
      <Header />
      {/* 리스트가 뿌려짐 */}
      <StContainer>
          {
            movies.map((movie)=>{
              // console.log("id",movie.id)
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
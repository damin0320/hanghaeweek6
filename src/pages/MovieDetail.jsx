import React from "react";
import { useParams , useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { __getmovie , __deletemovie} from "../redux/modules/MoviesSlice"
import styled from "styled-components";
import Header from "../components/Header"
import Comments from "../components/Comments"
  
  const MovieDetail = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const {movies} = useSelector((state) => state.movies)
  const  myidid  = useParams()

  useEffect(() => {
    dispatch(__getmovie());
  }, [dispatch]);
  
  // 파람스 아이디가 몇번째(indexId) 배열에 있는지 찾는부분 movies[indexId]
  const indexId = movies.findIndex((item) => {
    if (item.id == myidid.id) {
    return true;
    }
    return false;
    });

  // 댓글 삭제 버튼
  const movieDelete = () => {
    dispatch(__deletemovie(myidid.id))
    navigator ("/movielist")
  }
  
  return (
    <>
    <Header/>
    {
    <Stcontainer>
      <div key={movies[indexId].id}>
        <StThumnail></StThumnail>
        <Stbuttonbox>
            <Stbutton1 onClick={() => movieDelete(myidid)}>삭제</Stbutton1>
            {/* <Stbutton2 onClick={() => movieEdit(myidid)}>수정</Stbutton2> */}
        </Stbuttonbox>
        <h1>제목 :{movies.title}</h1>
        <div>내용 :{movies.content}</div>
      </div>  
    </Stcontainer>
    }
    <Comments />
    </>
  )
}
export default MovieDetail

const Stcontainer = styled.div`
  margin:0 auto;
  width:600px;
  margin-top:100px;
`
const StThumnail = styled.div`
img {
  height:300px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
},
  margin: 20px 0;
  width:600px;
  height:300px;
  text-align:center;
  background-color:#ddd;
  line-height:300px;
`
const Stbuttonbox = styled.div `
  display:flex;
  justify-content: space-between;
  margin-top:20px;
`
const Stbutton1 = styled.button`
  width:290px;
  height:50px;
  text-align:center;
  border:none;
  background-color:#94B49F;
  border-radius: 6px;
  cursor:pointer;
`
const Stbutton2 = styled.button`
  width:290px;
  height:50px;
  text-align:center;
  border:none;
  background-color:#94B49F;
  border-radius: 6px;
  cursor:pointer;
`
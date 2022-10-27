import { useParams , useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { __getmovies , __deletemovies , __editmovies} from "../redux/modules/MoviesSlice"
import styled from "styled-components";
import Header from "../components/Header"
import Comments from "../components/Comments"
  
  const MovieDetail = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const {movies} = useSelector((state) => state.movies)
  const  postid  = useParams()
  

  useEffect(() => {
    dispatch(__getmovies(postid));
  }, [dispatch]);


  // 댓삭제 버튼
  const movieDelete = () => {
    dispatch(__deletemovies(postid.id))
    navigator ("/movielist")
  }
  
  // 댓수정 시작
  const [editContent, setEditContent] = useState({
    title:"",
    content:"",
    id:postid.id,
  });
  
  const onClickEditHandler = () => {
    dispatch(
      __editmovies(editContent)
    )
  }
  
  const [toggle, setToggle] = useState(false);
  
  const editToggleHandler = () =>{
    toggle ? setToggle(false) : setToggle(true);
  }
  return (
    <>
    <Header/>
    {
    <Stcontainer>
      {
        movies.map((movie) => (movie.id === Number(postid.id) ) && (
        <div key={movie.id}>
        <StThumnail>
        <img src={movie.url} />
        </StThumnail>
        <H1>{movie.title}</H1>
        <P>{movie.content}</P>
          <Stbuttonbox>
              <Stbutton onClick={() => movieDelete(postid)}>삭제하기</Stbutton>
              <Stbutton onClick={editToggleHandler} >수정하기</Stbutton>
              <Stbutton onClick={() => {navigator("/MovieList")}}>뒤로가기</Stbutton>
          </Stbuttonbox>
        </div>  
        ))
      }
      
    </Stcontainer>
    }
    {toggle ? (
      <Correction>
      <Inputcorrection type="text" name="content" onChange={(event) => {setEditContent({
        ...editContent, content:event.target.value
      })}}/>
      <Cbutton onClick={onClickEditHandler}>수정완료</Cbutton>
    </Correction>
    ):null 
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
}
  margin: 20px 0;
  width:600px;
  height:300px;
  text-align:center;
  line-height:300px;
  background-color:#ddd;
  Background-color: transparent;
`
const Stbuttonbox = styled.div `
  display:flex;
  justify-content: space-between;
  margin-top:20px;
`
const H1 = styled.h1`
  color:#fff;
`
const P = styled.p`
  color:#fff;
`
const Stbutton = styled.button`
  width:190px;
  height:50px;
  text-align:center;
  border:none;
  background-color:#e50913;
  color:#fff;
  font-weight:600;
  cursor:pointer;
`
const Correction = styled.div`
  width: 600px;
  margin:0 auto;
`
const Inputcorrection =styled.input`
  margin:20px 0;
  width:460px;
  height:40px;
  text-indent:20px;
  border: 1px solid #ddd;
`
const Cbutton =styled.button`
  border:none;
  width:120px;
  height:44px;
  background-color:#e50913;
  color:#fff;
  font-weight:600;
  cursor:pointer;
  margin-left:14px;
`
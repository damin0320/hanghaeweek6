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
  const {id}  = useParams()

  useEffect(() => {
    dispatch(__getmovies(id));
  }, [dispatch]);


  // 댓삭제 버튼
  const movieDelete = () => {
    dispatch(__deletemovies(id))
    navigator ("/movielist")
  }
  
  // 댓수정 시작
  const [editContent, setEditContent] = useState({
    title:"",
    content:"",
    id:id,
  });
  
  const onClickEditHandler = () => {
    dispatch(
      __editmovies(editContent)
    )
    navigator("/movielist")
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
        movies.map((movie) => (movie.postid === Number(id) ) && (
        <div key={movie.postid}>
        <StThumnail>
        <img src={movie.imgUrl} />
        </StThumnail>
        <h1>{movie.title}</h1>
        <div>{movie.content}</div>
          <Stbuttonbox>
              <Stbutton onClick={() => movieDelete(id)}>삭제하기</Stbutton>
              <Stbutton onClick={editToggleHandler} >수정하기</Stbutton>
              <Stbutton onClick={() => {navigator("/MovieList")}}>뒤로가기</Stbutton>
          </Stbuttonbox>
        </div>  
        ))
      }
      
    </Stcontainer>
    }
    {toggle ? (
      <div>
      <input type="text" name="content" onChange={(event) => {setEditContent({
        ...editContent, content:event.target.value
      })}}/>
      <button onClick={onClickEditHandler}>수정완료</button>
    </div>
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
  background-color:#ddd;
  line-height:300px;
`
const Stbuttonbox = styled.div `
  display:flex;
  justify-content: space-between;
  margin-top:20px;
`
const Stbutton = styled.button`
  width:190px;
  height:50px;
  text-align:center;
  border:none;
  background-color:#94B49F;
  border-radius: 6px;
  cursor:pointer;
`
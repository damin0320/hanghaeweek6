import React, { useState} from "react";
import Header from "../components/Header"
import styled from "styled-components"
import { useNavigate} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { __addmovies, __getmovies} from "../redux/modules/MoviesSlice"



const AddMovie = () => {
  // 디스패치를 사용하겠다.
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // setMovieContent({...movieContent,file:fileimage})
  const [movieContent, setMovieContent] =useState ({
    title: "",
    content:"",
    id:0,
  })
  
  const {movies} = useSelector((state) => state.movies)
  // console.log("무비스",movies)

  // 인풋값 핸들러
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    //spread operator(전개 연산자)를 이용하여 movieContent초기값에 새로운값을 담는다.
    setMovieContent({...movieContent,[name]: value,});
    };
  
  // 인풋값 등록버튼
  const onClickButton=(event)=> {
    event.preventDefault();
    if (movieContent.content.trim() === "" || movieContent.title.trim() === "") {
      return alert("모든 항목을 입력해주세요.");
    }
        const obj = {
          title : movieContent.title,
          content: movieContent.content,
          id:Date.now()
        }
        dispatch(__addmovies(obj))

        //입력값 초기화
        setMovieContent({
          title: "",
          content: "",
        });
        navigate("/movielist");
        
        // console.log(obj)
  }
  
  //파일 미리볼 url을 저장해줄 state
  const [fileImage, setFileImage] = useState("");
  
  // 이미지 가져오기
  const saveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };
  
  return (
    <>
      <Header />
      {/* 썸네일,타이틀,코멘트 */}
      <StContainer>
        <Stcontainerbox>
        <StThumbNail>
          {fileImage && (
            <img
              alt="sample"
              src={fileImage}
              style={{ margin: "auto" }}
            />
          )}
        </StThumbNail>
            <input
              name="imgUpload"
              type="file"
              accept="image/*"
              onChange={saveFileImage}
            />
        </Stcontainerbox> 
        {/* input그룹 */}
        <InputGroup>
          <Stinput 
          type="text"
          name="title"
          value={movies.title} onChange={onChangeHandler}
          placeholder="제목을 입력해주세요"/>
          <Stinput 
          type="text"
          name="content"
          value={movies.content} onChange={onChangeHandler}
          placeholder="내용을 입력해주세요"/>
          <StButton onClick={onClickButton}>작성완료</StButton>
        </InputGroup>
      </StContainer>
    </>
  );
}

export default AddMovie

const StContainer = styled.div`
  margin:0 auto;
  max-width:600px;
  margin-top:100px;
`
// const StyeldLink = styled(Link)`
//   text-Decoration:none;
//   color:#fff;
// `
const Stcontainerbox = styled.div`
  
`
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`
const Stinput = styled.input`
  max-width:600px;
  height:40px;
  margin-bottom:10px;
  border:none;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding:0;
  text-indent:15px;
`
const StButton = styled.button`
  width:600px;
  height:40px;
  border:none;
  background-color:#94B49F;
  border-radius: 6px;
  color:#565656;
  font-weight:600;
  cursor: pointer;
`
const StThumbNail = styled.div`
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


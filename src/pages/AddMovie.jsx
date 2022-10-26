import React, { useState} from "react";
import Header from "../components/Header"
import styled from "styled-components"
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { __addmovies, __getmovies} from "../redux/modules/MoviesSlice"



const AddMovie = () => {
  // 디스패치를 사용하겠다.
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // setMovieContent({...movieContent,file:fileimage})
  const [prevImg, setPrevImg] = useState("")
  const [movieContent, setMovieContent] =useState ({
    title: "",
    content:"",
    id:0,
    url:""
  })
  
  
  const {movies} = useSelector((state) => state.movies)

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setMovieContent({...movieContent,[name]: value,});
    };
  

    const obj = {
      title : movieContent.title,
      content: movieContent.content,
      url : movieContent.url,
      id:Date.now()
    }
 
    // 사진 등록 및 미리보기
    const postUrl = () => {
      if(obj.url === "" || obj.url === undefined) {
        return alert ("URL을 입력해주세요!")
      }else{
        setPrevImg(obj.url)
        alert("등록이 완료되었습니다.")
      }
    }
 
    // 인풋값 등록버튼
  const onClickButton=(event)=> {
    event.preventDefault();
    if (movieContent.content.trim() === "" || movieContent.title.trim() === "" )  {
      return alert("모든 항목을 입력해주세요.");
    }     
        dispatch(__addmovies(obj))
        setMovieContent({
          title: "",
          content: "",
          url: ""
        });
        navigate("/movielist");
}
  //사진등록 토클
  const [toggle, setToggle] = useState(false);
  
  const editToggleHandler = () =>{
    toggle ? setToggle(false) : setToggle(true);
  }
  
  return (
    <>
      <Header />
      {/* 썸네일,타이틀 */}
      <StContainer><Stcontainerbox>
        <StThumbNail>
          <img src={prevImg} />
        </StThumbNail>
         <Stbutton onClick={editToggleHandler}>사진등록하기</Stbutton>  
         {toggle ? (
            <div>
              <StThum><img src="/show.jpg" alt="안내이미지" /></StThum>
              <P>구글에서 원하시는 이미지 검색후 우클릭하여 주소를 복사해주세요</P>
              <PutBox>
                <Input type="text" value={movies.url} name="url" placeholder="사진 URL을 등록해주세요!" onChange={onChangeHandler}/>
                <Button type="button" onClick={postUrl}>등록완료</Button>
              </PutBox>
          </div>
          ):null 
          } 
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
  width:600px;
  margin-top:100px;
`
const PutBox = styled.div`
  display:flex;
  justify-content:space-around;
`
const Input = styled.input`
  width:480px;
  height:40px;
  margin-bottom:10px;
  border:none;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding:0;
  text-indent:15px;
  font-size:14px;
  color:#666;
  text-overflow : hideen
`
const Button = styled.button`
  
  width:100px;
  height:40px;
  border:none;
  background-color:#94B49F;
  border-radius: 6px;
  color:#fff;
  font-weight:600;
  cursor: pointer;
`
const Stcontainerbox = styled.div`
  
`
const P = styled.p`
  font-size:12px;
  color:#777;
  text-align:center;
  
`
const StThum =styled.div`
  width:600px;
  height:300px;
  text-align:center;
  img {
    height:300px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
`
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`
const Stbutton = styled.button`
  margin: 10px 0;
  width:600px;
  height:40px;
  border:none;
  background-color:#94B49F;
  border-radius: 6px;
  font-weight:600;
  cursor: pointer;
  color:#fff;
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
  color:#fff;
  font-weight:600;
  cursor: pointer;
`
const StThumbNail = styled.div`
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

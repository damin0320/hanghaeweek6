// 콘솔 주석 완료
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  __addComment, __deleteComment,  __getComment } from "../redux/modules/CommentsSlice"
import styled from "styled-components";

const Comment = (props) => {
    
  //filter에 사용할 todos와 id 불러오기
  const { id } = useParams()
  const dispatch  = useDispatch ("");
  
  //댓글 useState
  const [comment, setComment] = useState({
    username: "",
    content: "",
  });
  
  const comments = useSelector((state)=> state.comments.comment)
  console.log("코멘트값은", comments);
  const onChangeInputHandler = (event) => {
  const { name, value } = event.target;
      setComment({
        ...comment,
        [name]: value,
      });
  };
  
  const onAddCommentButtonHandler = (event) => {
    event.preventDefault();
    if (comment.content.trim() === "" || comment.username.trim() === "") {
      return alert("모든 항목을 입력해주세요.");
    }
    // 스토에어서 모듈에 있는 코멘트.js를 거쳐서 값을 가져온다.
    dispatch(__addComment({ id: comments.length+1, todoId: id, ...comment }));
    // 입력값 초기화
    setComment({
      username: "",
      content: "",
    });
  };

  
  // 댓글 삭제 버튼
   const onDeleteButton = (id) => {
  // console.log("딜리트아이디",id)
      // dispatch(__addCommentDelete(id))
      dispatch(__deleteComment(id))
      alert ("삭제하시겠습니까?")
  };
  
  //디스패치-명령 // 리스트로 
  useEffect(() => {
    dispatch(__getComment());
  }, [dispatch]); //의존성배열 // 빈배열일땐 한번만 실행 //만약 useComment와 같은 함수를 불러오면 계속 생성됨
      // 가져올때 유즈이펙트 빈배열로 빈배열은 한번씩실행한다...
  
    
  
return (
  <>
    
    <StCommentBox >
      <StNameInput
        placeholder="이름 (5자 이내)"
        value={comment.username}
        type="text"
        name="username"
        onChange={onChangeInputHandler}
        maxLength={5}
      />

      <StcommentInput
        placeholder="(100자 이내로 입력해주세요)"
        value={comment.content}
        name="content"
        type="text"
        onChange={onChangeInputHandler}
        maxLength={100}
      />
        <button onClick={onAddCommentButtonHandler}>
            추가하기
        </button>
    </StCommentBox>

    <StCommentListBox>
        {   //댓글달기
            comments.map((item) => {
                // console.log(item)
                // console.log(id)
                // 조건을 걸어줌으로서 todoid안에 또 다른 id값을 지정해서 댓글을 등록
                //item은 그냥 함수
                if (item.todoId == id){
                    return(
                    <StCommentList key={item.id}>
                        <Ststrong>{item.username}</Ststrong>
                        <Stspan>{item.content}</Stspan>
                        <button size="md" custom="h" onClick={() => onDeleteButton(item.id)}>삭제하기</button>
                    </StCommentList>
                ) 
                }
                
            })
        }                    
    </StCommentListBox>
        
  
  </>
  )
}


export default Comment;

const StCommentBox = styled.div`
  display: flex;
  width: 80%;
  max-width: 1000px;
  height: 100px;
  margin: 0 auto;
  gap: 8px;
  
`;

const StNameInput = styled.input`
  width:120px;
  height:30px;
  border: 1px color red;
  
  
`;

const StcommentInput = styled.input`
  width: 800px;
  height:30px;
`;

const StCommentListBox = styled.div`
  width: 80%;
  max-width: 1000px;
  margin: 0 auto;
  gap: 8px;
`;

const StCommentList = styled.div`
  display:felx;
  border-bottom: 1px solid #ddd;
  text-align:center;
  position: relative;
  padding:30px;
  
`;

const Ststrong = styled.strong`
  margin-right:40px;
  height:30px;
`;

const Stspan = styled.strong`
  font-weight:400;
  width: 80%;
  max-width: 1000px;
  margin: 0 auto;
  gap: 8px;
`;
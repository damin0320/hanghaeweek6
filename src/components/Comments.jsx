// 콘솔 주석 완료
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {__addComment, __deleteComment, __getComment} from "../redux/modules/CommentsSlice"
import styled from "styled-components";

const Comment = () => {
    
  
  const { id } = useParams()
  let newid = Number(id)
  
  const dispatch  = useDispatch ("");
  //댓글 useState
  const [comment, setComment] = useState({
    comment: "",
  });
  
  const comments = useSelector((state)=> state.comments.comments)
  console.log(comments)
  const onChangeInputHandler = (event) => {
  const { name, value } = event.target;
      setComment({
        ...comment,
        [name]: value,
      });
  };
  
  const onAddCommentButtonHandler = (event) => {
    event.preventDefault();
    if (comment.comment.trim() === "") {
      return alert("모든 항목을 입력해주세요.");
    }
    
    dispatch(__addComment({newid, ...comment }));
    
    setComment({
      comment: "",
    });
  };

  
  // 댓글 삭제 버튼
  const onDeleteButton = (id) => {
      dispatch(__deleteComment({newid, id}))
      alert ("삭제하시겠습니까?")
  };
  
  //디스패치-명령 // 리스트로 
  useEffect(() => {
    dispatch(__getComment(newid));
  }, [dispatch]); 
     
  
    
  
return (
  <>
    <StCommentBox >
      <StcommentInput
        placeholder="(100자 이내로 입력해주세요)"
        value={comment.comment}
        name="comment"
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
                
                    return(
                    <StCommentList key={item.commentid}>
                        <Ststrong>{item.nickname}</Ststrong>
                        <Stspan>{item.comment}</Stspan>
                        <button onClick={() => onDeleteButton(item.commentid)}>삭제하기</button>
                    </StCommentList>
                ) 
                }
                
            )
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
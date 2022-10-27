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
  const [comment, setComment] = useState({
    comment: "",
  });
  
  const comments = useSelector((state)=> state.comments.comments)
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
        <Button onClick={onAddCommentButtonHandler}>
            추가하기
        </Button>
    </StCommentBox>
    
    <StCommentListBox>
        {   
            comments.map((item) => {
                
                    return(

                    <StCommentList key={item.commentid}>
                        <Ststrong>{item.nickname}</Ststrong>
                        <Stspan>{item.comment}</Stspan>
                        <Button2 onClick={() => onDeleteButton(item.commentid)}>삭제하기</Button2>
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
  width: 600px;
  margin: 0 auto;
  margin-top:15px;
`;

const StNameInput = styled.input`
  width:100px;
  height:40px;
  border: 1px color red;
`

const StcommentInput = styled.input`
  width: 360px;
  height:40px;
  margin-left:10px;
  text-indent:15px;
`;

const Button = styled.button`
  width:120px;
  margin-left:10px;
  font-weight:600;
  color:#fff;
  background-color:#e50913;
  
`

const StCommentListBox = styled.div`
  width: 600px;
  margin: 0 auto;
`

const StCommentList = styled.div`
  border-bottom: 1px solid #333333;
  display:flex;
  padding:20px 0;
`;

const Ststrong = styled.strong`
  width:87px;
  padding:8px;
  color:#fff;
  display:block;
`;

const Stspan = styled.span`
  width:360px;
  padding:8px;
  color:#fff;
  display:block;
`;
const Button2 =styled.button`
  border:none;
  cursor:pointer;
  width:120px;
  height:40px;
  margin-left:10px;
  font-weight:600;
  color:#fff;
  background-color:#e50913;
`
// 콘솔 주석 확인 완료!
import { createSlice , createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../cookie/cookie";

// initial State
const initialState = {
  comments : [],
  isLoading : false,
  error: null,
  }
  const headers = {
    'Content-Type' : 'application/json',
    'Access_Token' : getCookie('Access_Token')
}
  const params = {
    key: process.env.REACT_APP_COMMENT,
  };
  const SERVICE_URL = params.key


export const __getComment = createAsyncThunk(
  "comments/getcomment",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${SERVICE_URL}/${payload}` , {headers : headers});
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const __addComment = createAsyncThunk(
  "comments/addcomment",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(`${SERVICE_URL}/${payload.id}`,payload, {headers : headers});
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteComment = createAsyncThunk(
  "comments/deletecomment",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(`${SERVICE_URL}/${payload}`, {headers : headers});
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//extraReducers
export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: {
    //사용
    [__getComment.pending]: (state) => {
      state.isLoading = true; 
    },
    [__getComment.fulfilled]: (state, action) => {
      state.isLoading = false; 
      state.comments = action.payload; 
    },
    [__getComment.rejected]: (state, action) => {
      state.isLoading = false; 
      state.error = action.payload;
    },

    //추가
    [__addComment.pending]: (state) => {
      state.isLoading = true; 
    },
    [__addComment.fulfilled]: (state, action) => {
      state.isLoading = false; 
      state.comments.push(action.payload); 
      
    },
    [__addComment.rejected]: (state, action) => {
      state.isLoading = false; 
      state.error = action.payload; 
    },
    
    //삭제
    [__deleteComment.pending]: (state) => {
      state.isLoading = true; 
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;  
      state.comments = state.comments.filter((item) => Number(item.id)!== action.payload);
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isLoading = false; 
      state.error = action.payload; 
    },
  },
});



// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { getComment, addComment, deleteComment } = commentsSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default commentsSlice.reducer;

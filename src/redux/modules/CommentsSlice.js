// 콘솔 주석 확인 완료!
import { createSlice , createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";

// initial State
const initialState = {
  comment : [],
  isLoading : false,
  error: null,
  }

export const __getComment = createAsyncThunk(
  "comments/getcomment",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/movies");
      // console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addComment = createAsyncThunk(
  "comments/addcomment",
  // async 는 프로미스에 새로운 신문법이다. // 언제끝나는지 알려준다.
  async (payload, thunkAPI) => {
    try {
      // payload를 데이터를 넣어줄때까지 실행하지 하지않겠다. //비동기
      const data = await axios.post("http://localhost:3001/movies",payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteComment = createAsyncThunk(
  "comments/deletecomment",
  // async 는 프로미스에 새로운 신문법이다. // 언제끝나는지 알려준다.
  async (payload, thunkAPI) => {
   
    try {
      // payload를 데이터를 넣어줄때까지 실행하지 하지않겠다. //비동기
      const data = await axios.delete(`http://localhost:3001/movies/${payload}`);
      // console.log("페이로드",payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



//extraReducers
export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [__getComment.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getComment.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      
      state.comment = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__getComment.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__addComment.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__addComment.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다. 
      state.comment.push(action.payload) ; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      //추가로 넣어야하니까 푸쉬를 이용해 맨뒤에 쌓아주려고
    },
    [__addComment.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__deleteComment.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__deleteComment.fulfilled]: (state, action) => {
    
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다. 
      state.comment = state.comment.filter((item) => item.id!== action.payload); // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});




//toolkit
// const commentSlice = createSlice({
//     name: "comment",
//     initialState,   
//     reducers: {     
//         commentTodo: (state, action) => {
//         state.comment = [...state.comment,{...action.payload}]
//       },
//         deleteTodo: (state, action) => {
//         state.comment = [...state.comment.filter(comment => {
//                               return comment.id !== action.payload
//                         })]
//       },
//     },
// });

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { commentTodo, deleteComment } = commentSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default commentSlice.reducer;

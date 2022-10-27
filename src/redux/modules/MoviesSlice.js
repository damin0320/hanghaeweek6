import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../cookie/cookie";


// initial State
const initialState = {
  movies: [],
  isLoading: false,
  error: null,
  } 
  const params = {
    key: process.env.REACT_APP_MOVIE,
  };
  const headers = {
    'Content-Type' : 'application/json',
    'Access_Token' : getCookie('Access_Token')
}

  const SERVICE_URL = params.key
  export const __getmovies = createAsyncThunk(
    "movies/getmovies",
    async (payload, thunkAPI) => {
    try {
    const data = await axios.get(`${SERVICE_URL}/show`);
    return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
    }
    );

    
  export const __addmovies = createAsyncThunk(
    "movies/addmovies",
    async (payload, thunkAPI) => {
    try {
    const data = await axios.post(SERVICE_URL, payload, {headers : headers});
    return thunkAPI.fulfillWithValue(data.data.data);
    // 깊이 있게 들어갔어야 하는 문제. console로 배열 객체 확인 꼭 하기
    } catch (error) {
      alert("로그인이 필요합니다.")
      window.location.replace('/')
      return thunkAPI.rejectWithValue(error);
    }
    }
    );

  export const __deletemovies = createAsyncThunk(
    "movies/deletemovie",
    async (payload, thunkAPI) => {
    try {
    const data = await axios.delete(`${SERVICE_URL}/${payload}`, {headers : headers});
    return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      alert("로그인이 필요합니다.")
      window.location.replace('/')
        return thunkAPI.rejectWithValue(error);
    }
    }
    );  
  

  export const __editmovies = createAsyncThunk(
    "movies/editmovie",
    async (payload, thunkAPI) => {
    try {
    await axios.patch(`${SERVICE_URL}/${payload.id}`, {id:payload.id,content:payload.content}, {headers : headers});
    const data = await axios.get(`${SERVICE_URL}/show/${payload.id}`);
    return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      alert("로그인이 필요합니다.")
      window.location.replace('/')
    return thunkAPI.rejectWithValue(error);
    }
    }
    );
    
    
const moviesSlice = createSlice({
  name: "movies",
  initialState,
    extraReducers: {
      //요청
      [__getmovies.pending]: (state) => {
        state.isLoading = true; 
      },
      [__getmovies.fulfilled]: (state, action) => {
        state.isLoading = false; 
        state.movies = action.payload; 
      },
      [__getmovies.rejected]: (state, action) => {
        state.isLoading = false; 
        state.error = action.payload; 
      },
      
      // 추가
      [__addmovies.pending]: (state) => {
        state.isLoading = true;
      },
      [__addmovies.fulfilled]: (state, action) => {
        state.isLoading = false;
        // state.movies = action.payload;
        // (배열 = 객체다...)
        // .map error : 배열이 아닌 에러...
        // 구면인 에러.
        state.movies.push(action.payload)
      },
      [__addmovies.rejected]: (state, action) => {
        state.isLoading = false; 
        state.error = action.payload; 
      }, 

      // 삭제
      [__deletemovies.pending]: (state) => {
        state.isLoading = true; 
      },
      [__deletemovies.fulfilled]: (state, action) => {
        state.isLoading = false;  
        state.movies = state.movies.filter((item) => item.id !== action.payload); 
      },
      [__deletemovies.rejected]: (state, action) => {
        state.isLoading = false; 
        state.error = action.payload; 
      },

      //수정
      [__editmovies.pending]: (state) => {
        state.isLoading = true; 
      },
      [__editmovies.fulfilled]: (state, action) => {
        state.isLoading = false; 
        state.movies = action.payload;
      },

      [__editmovies.rejected]: (state, action) => {
        state.isLoading = false; 
        state.error = action.payload; 
      },

    }})
    
export const {getmovies,addmovies,deletemovie,editmovie} = moviesSlice.actions;
export default moviesSlice.reducer;

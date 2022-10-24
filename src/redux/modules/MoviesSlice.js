import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// initial State
const initialState = {
    movies: [
      {
        id: 0,
        title: "",
        content: "",
      }
    ]
  } 
  
  
  export const __getmovies = createAsyncThunk(
    "movies/getmovies",
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
    
  export const __getmovie = createAsyncThunk(
    "movies/getmovie",
    async (payload, thunkAPI) => {
    try {
    const data = await axios.get(`http://localhost:3001/movies/${payload}`);
    // console.log("페이로드",data);
    return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
    }
    );
    
  export const __addmovies = createAsyncThunk(
    "movies/addmovies",
    async (payload, thunkAPI) => {
      // console.log("페이로드",payload)
    try {
    await axios.post("http://localhost:3001/movies", payload);
    return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
    }
    );

  export const __deletemovie = createAsyncThunk(
    "movies/deletemovie",
    async (payload, thunkAPI) => {
    try {
    const data = await axios.delete(`http://localhost:3001/movies/${payload}`);
    // console.log("데이터",payload);
    return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
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
        state.isLoading = false; // 네트워크 요청이 끝나서 false
        state.movies = action.payload; 
      },
      [__getmovies.rejected]: (state, action) => {
        state.isLoading = false; 
        state.error = action.payload; 
      },

      //리스트상세
      [__getmovie.pending]: (state) => {
        state.isLoading = true; 
      },
      [__getmovie.fulfilled]: (state, action) => {
        state.isLoading = false; // 네트워크 요청이 끝나서 false
        state.movies = action.payload; 
      },
      [__getmovie.rejected]: (state, action) => {
        state.isLoading = false; 
        state.error = action.payload; 
      },
      
      // 추가
      [__addmovies.pending]: (state) => {
        state.isLoading = true;
      },
      [__addmovies.fulfilled]: (state, action) => {
        state.isLoading = false; // 네트워크 요청이 끝나서 false
        // console.log("애드무비",action.payload)
        state.movies.push(action.payload); 
      },
      [__addmovies.rejected]: (state, action) => {
        state.isLoading = false; 
        state.error = action.payload; 
      }, 

      // 삭제
      [__deletemovie.pending]: (state) => {
        state.isLoading = true; 
      },
      [__deletemovie.fulfilled]: (state, action) => {
        // console.log("삭제",action.payload)
        state.isLoading = false;  // 네트워크 요청이 끝나서 falses
        state.movies = state.movies.filter((item) => item.id !== action.payload); 
      },
      [__deletemovie.rejected]: (state, action) => {
        state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
        state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
      },

    }})

export const {getmovies,addmovies,deletemovie} = moviesSlice.actions;
export default moviesSlice.reducer;

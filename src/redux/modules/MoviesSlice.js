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
    return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
    }
    );

  export const __addmovies = createAsyncThunk(
    "movies/addmovies",
    async (payload, thunkAPI) => {
    try {
    await axios.post("http://localhost:3001/movies", payload);
    return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
    }
    );

  export const __deletemovies = createAsyncThunk(
    "movies/deletemovie",
    async (payload, thunkAPI) => {
    try {
    const data = await axios.delete(`http://localhost:3001/movies/${payload}`);
    return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
    }
    );  
  

  export const __editmovies = createAsyncThunk(
    "movies/editmovie",
    async (payload, thunkAPI) => {
    try {
    await axios.patch(`http://localhost:3001/movies/${payload.id}`, {id:payload.id,content:payload.content});
    const data = await axios.get("http://localhost:3001/movies");
    return thunkAPI.fulfillWithValue(data.data);
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
        state.movies.push(action.payload); 
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

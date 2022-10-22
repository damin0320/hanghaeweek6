import { createSlice, current } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  account : [],
  isLoading : false,
  error : null
};

export const __userLogin = createAsyncThunk(
  "account/userLogin",
  // login : reducer name, 경로 정해줘야
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("http://localhost:3001/account", payload);
      const accessToken = data.headers.authorization;
      const refreshToken = data.headers["refresh-token"];
      if (data.status === 200 || data.status === 201) {
        window.localStorage.setItem("accessToken", accessToken);
        window.localStorage.setItem("refreshToken", refreshToken);
        window.localStorage.setItem("nickname", data.data.data.nickname);
        alert("로그인 성공");
        window.location.replace("/")}

      return thunkAPI.fulfillWithValue(payload)
    } catch (error) {
      if (400 < error.data.status && error.data.status < 500) {
        window.location.reload();
        alert("로그인 실패")
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const  __userSignUpGet = createAsyncThunk(
  "account/userSignUpGet",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/account")
      return thunkAPI.fulfillWithValue(data.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const  __userSignUp = createAsyncThunk(
  "account/userSignUp",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("http://localhost:3001/account", payload)
      return thunkAPI.fulfillWithValue(payload)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)


export const LoginSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: {
    [__userLogin.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__userLogin.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isSuccess = false;
      state.account=action.payload; // 
    },
    [__userLogin.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isSuccess = false;
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__userSignUpGet.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__userSignUpGet.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isSuccess = false;
      state.account=action.payload;
    },
    [__userSignUpGet.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isSuccess = false;
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__userSignUp.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__userSignUp.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isSuccess = false;
      state.account.push(action.payload); // 
    },
    [__userSignUp.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isSuccess = false;
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  }
})

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { userLogin, userSignUp, userSignUpGet } = LoginSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default LoginSlice.reducer;


// import { setCookie } from "../../cookie/cookie";
// const accessToken = data.data.token;
// setCookie("is_login", `${accessToken}`); 
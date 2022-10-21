import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddMovie from "../pages/AddMovie";
import MovieDetail from "../pages/MovieDetail";
import MovieList from "../pages/MovieList";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 페이지 이동하기 */}
        <Route path='/' element={<SignInPage />} />

        {/* 회원가입 페이지 이동하기 */}
        <Route path='signup' element={<SignUpPage />} />

        {/* 무비 리스트 생성 페이지로 이동하기 */}
        <Route path='/addmovie' element={<AddMovie />} />

        {/* 게시글 홈으로 이동하기 */}
        <Route path='/movielist' element={<MovieList />} />

        {/* 무비리스트 카드별 상세보기 페이지로 이동하기 */}
        <Route path='/moviedetail/:id' element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

# 항해 6주차 팀과제 2 : Redux, Toolkit 등 활용한 미니프로젝트(영화 추천 페이지 "두둥")


## 프론트 팀 : 안다민(조 총괄 팀장) / 김현진

## 프로젝트 소개

<p align="justify">
리액트 심화 및 리덕스 기본기를 바탕으로 백엔드와 소통하여 영화 추천 페이지 만들기<br>
제한 및 공통 사항 : <br>
  <li> 컴포넌트 및 UI는 자유로 한다.</li>
  <li> ducks 패턴 활용한다.</li>
  <li> Redux 등 심화 과정에 필요한 자료를 활용한다.</li>
  <li> 배운 내용을 복습한다 생각하고 백엔드와 데이터를 주고 받아본다.</li>

</p>


### <a href="https://hanghaeweek6.vercel.app/">버셀 배포 페이지</a>

### <a href="https://shine-industry-2cc.notion.site/2-5a0bc706fae84ae0ad28340f46a1f27d">노션 SA</a>

### <a href="https://youtu.be/dYRAdOVCbNw">유튜브 링크</a>

---
<br>

## 기술 스택

HTML / CSS in JS / JavaScript / React / Redux / Redux Toolkit / git / gitHub / Velcel

---
<br>

## 구현 요소 및 역할 분담

- 로그인 및 회원가입(다민)

- 영화 추천 페이지 CRUD(현진) + URL 방식 사진 업로드(다민)

- 게시글 댓글 CRD(현진)

---
## 구현 기능

### 기능 1 : 로그인 및 회원가입

- AccessToken 백엔드와 관리 통한 유저 식별(header에 담겨 오는 토큰 직접 관리)

- 쿠키 활용한 토큰 보안 강화

- 유저 회원가입 시 조건에 맞는 유효성 검사(정규표현식 등 활용)

- AccessToken 만료 시 403 에러 처리 후 유저에게 재 로그인 권장 alert 기능 구현

<br>


### 기능 2 : react- router-dom 통한 페이지 별 관리

- home화면, 할일 기록하기 화면, 영화 페이지 확인, 상세페이지 등 react-router-dom으로 관리

- router에서 url 상세 관리

- navigate로 페이지 이동

<br>

### 기능 3 : 영화 추천 페이지 CRUD

- 게시물인 영화 추천 페이지 생성, 읽기, 수정, 삭제 기능 모두 구현

- CRUD 모두 리덕스 툴킷 + thunk 활용(TodosSlice)

- CRUD 모두 미들웨어 이용한 action Dispatch -> 리듀서 과정 비동기 처리

- 토글 기능 활용한 수정 창 숨기기

- 실제 백엔드 데이터 송수신하며 게시물 데이터 관리


<br>

### 기능 4 : 댓글 CRD

- 게시물의 댓글의 생성, 읽기, 수정, 삭제 기능 모두 구현

- CRD 모두 리덕스 툴킷 + thunk 활용(commentsSlice)

- CRD 모두 미들웨어 이용한 action Dispatch -> 리듀서 과정 비동기 처리
 
- 특정 유저가 적은 댓글 확인 가능하게 백엔드에서 받은 닉네임 활용

<br>

### 기능 5 : URL 통한 사진 업로드

- img 태그 src에 사진 넣으면 사진이 업로드 되는 아이디어 응용. 유저가 준 변수를 넣어주어 이미지 업로드

- 미리보기 기능 활용하여 유저가 사진 url을 미리 볼 수 있게 한 편의성 제공

<br>

### 기능 6 : 그 외 구현 사항

- 동적 라우팅을 사용 (공통) -> react-router-dom 활용

- Form에 유효성 검증 기능을 적용 -> 회원가입 시 조건에 맞지 않을 시 alert 동작

- 배포된 결과물에서는 `console.log()` 가 보이지 않도록 처리 -> 코드 확인 완료

- `.env` 를 이용해서 API 서버의 URL 코드상에서 숨기도록 처리 -> env 로 URL 코드상에서 모두 가림

<br>

---

## 컴포넌트와 나눈 이유

### Ducks 패턴 활용 통한 컴포넌트 나누기

### 1. Components
- Comments.jsx : 댓글 관리
- SignIn.jsx & SignUp : 로그인 및 회원가입
- Header.jsx & Layout.jsx : 홈페이지 전반적 레이아웃(홈, 로그아웃, 글쓰기 포함)

<br>

### 2. Pages
- AddMovie.jsx : list에 게시될 게시글 위한 기능 구현
- MovieDetail.jsx : 게시글의 디테일 페이지
- MovieList.jsx : 게시물 리스트 페이지
- SiginInPage.jsx : 로그인 페이지
- SignUpPage.jsx : 회원가입 페이지


<br>

### 3. redux & Router & cookie
- modules > LoginSlice.js : Login의 Reducer 관리
- modules > CommentsSlice.js : comment의 Reducer 관리
- modules > MoviesSlice.js : Movie의 Reducer 관리
- shared > Router.jsx : react-router-dom 방식에 따라 로그인 페이지, 상세페이지 이동 위한 설정으로 패턴 관리
- cookie > cookie.js : AccessToken 받기 위한 쿠키 함수 모음

<br>

---
## 배운 점 & 아쉬운 점

(다민)

### 배운 점 : 
- 리액트로 로그인 및 회원가입을 구현할 수 있게 되었다.
- 현진님 코드를 보고 함께 고치면서 CRUD에 대한 전반적인 감을 잡을 수 있는 계기가 되었다.
- 조건부 렌더링 등 다양한 신기술을 접할 수 있었다.

### 아쉬운 점 : 
- 트러블 슈팅으로 주로 객체를 mapping 하는 것으로 시간을 많이 쓴 것이 아쉬웠다.
- 당초 기획한 챌린지에 대해서 도전하지 못 한게 아쉽다.(소셜로그인, 좋아요, Header 토큰 교체)
- 백엔드와 소통하며 예상치 못한 버그가 많았어서 시간이 많이 초과된 경험을 한 것이 좋기도 하고 계획하지 못해 아쉽기도 하다.

(현진)

### 배운 점 :
- 변수명을 했갈리게 했다가 오류를 고칠때 어려움을 겪었으며, 다시한번 변수명을 잘 정해야 한다는걸 느꼈다.
- CRUD를 하면서 내가 무엇이 부족한지를 알게 되었고, 객채,배열을 어떻게 접근해야하는지 다민님 도움 덕분에 많은 공부가 되었다.

### 아쉬운 점 :
- CRUD를 구현하는데 있어서 아쉬운점이 발견되었고 자바스크립트를 공부를 추가적으로 열심히 해야한다고 느꼈다.
- 이번에 로그인,로그아웃을 하지 않고 crud를 다시한번 하게 되었는데 이부분은 그냥 로그인,로그아웃을 접해 보지 못해서 아쉬움 정도로 느꼈고
다민님이 작성하신 로그인,로그아웃 코드를 분석하고 공부해서 내껄로 만들어야겠다.

<br>

<p align="justify">

</p>

<br>

---

## 라이센스

Copyright 2022. hang-hae99 9th W6 team 2. all rights reserved.

import React, { useEffect } from "react";

import Header from "./components/Header";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import "./index.scss";

import { Routes, Route } from "react-router-dom";
import FullPost from "./pages/FullPost";

import { fetchMe } from "./store/reducers/actionsCreators";

import { useAppDispatch } from "./hooks";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  return (
    <>
      <Header />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/registration" element={<Registration />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<CreatePost />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

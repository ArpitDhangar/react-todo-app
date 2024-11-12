import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Header from "./components/Header";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { Context, server } from "./main";
// import './styles/app.scss'

function App() {
  const { user, setUser, setIsAuthenticated, setLoading } = useContext(Context);

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error.response.data.message)
        setUser({})
        setIsAuthenticated(false)
        setLoading(false)
      })
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App;

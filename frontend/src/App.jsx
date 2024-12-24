//import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect, useState, createContext } from "react";
import axios from "axios";

export const IsLoggedInContext = createContext();
export const SetIsLoggedInContext = createContext();
export const UserContext = createContext();

function App() {
  const [IsLoggedIn, SetIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:500/api/user", { withCredentials: true })
      .then((response) => {
        console.log("here", response.data.user);
        if (response.data.user) {
          SetIsLoggedIn(true);
          setUser(response.data.user);
        } else {
          SetIsLoggedIn(false);
        }
      })
      .catch(() => SetIsLoggedIn(false));
  }, []);
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <IsLoggedInContext.Provider value={IsLoggedIn}>
          <SetIsLoggedInContext.Provider value={SetIsLoggedIn}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/register"
                element={IsLoggedIn ? <Navigate to="/" /> : <Register />}
              />
              <Route
                path="/login"
                element={IsLoggedIn ? <Navigate to="/" /> : <Login />}
              />
            </Routes>
          </SetIsLoggedInContext.Provider>
        </IsLoggedInContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;

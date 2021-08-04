import "../src/styles/App.css"
import TopBar from "./components/TopBar";
import React, {useState} from "react";
import {TOKEN_KEY} from "./constants";
import Main from "./components/Main";


function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem(TOKEN_KEY) ? true : false);
    const logout = ()=> {
        console.log("logout")
        localStorage.removeItem(TOKEN_KEY);  // remove token from local storage when logged out.
      setIsLoggedIn(false);
    };

    const loggedIn = (token) => {
        if (token) {
            localStorage.setItem(TOKEN_KEY, token);
            setIsLoggedIn(true);
        }

    }
  return (
    <div className="">
        <TopBar isLoggedIn={isLoggedIn} handleLogOut={logout}></TopBar>
        <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn}></Main>
    </div>

  );
}



export default App;

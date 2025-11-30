import React from 'react'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import SignUp from "./pages/Auth/SignUp.jsx";
import Login from "./pages/Auth/Login.jsx";
import Home from "./pages/Dashboard/Home.jsx";
import Income from "./pages/Dashboard/Income.jsx";
import Expense from "./pages/Dashboard/Expense.jsx";
const App = () => {
    return (
        <div>
            < Router>
                <Routes>
                    <Route path="/"  element={<Root />} />
                    <Route path="/Login" exact element={<Login />} />
                    <Route path="/SignUp" exact element={<SignUp />} />
                    <Route path="/Dashboard" exact element={<Home />} />
                    <Route path="/Income" exact element={<Income />} />
                    <Route path="/Expense" exact element={<Expense/>}/>
                </Routes>
            </Router>
        </div>
    )
}
export default App

const Root = () => {
    //check if token exists in local storage
    const isAuthenticated = !!localStorage.getItem('token');

    //redirect to dashboard if authenticated
    return isAuthenticated ?
        (<Navigate to="/Dashboard" />) : (
            <Navigate to="/Login" />
        );
};

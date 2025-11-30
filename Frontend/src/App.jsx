import React, { useContext } from 'react';
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
import { UserContext, UserContextProvider } from './context/userContext.jsx';
import { useUserAuth } from './hooks/useUserAuth';

const App = () => {
    return (
        <UserContextProvider>
            <Router>
                <AppContent />
            </Router>
        </UserContextProvider>
    );
}

const AppContent = () => {
    useUserAuth(); // Hook now runs inside Router context
    const { loading } = useContext(UserContext);

    if (loading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    return (
        <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/income" element={<ProtectedRoute><Income /></ProtectedRoute>} />
            <Route path="/expense" element={<ProtectedRoute><Expense /></ProtectedRoute>} />
        </Routes>
    );
}

const Root = () => {
    const { user } = useContext(UserContext);
    return user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(UserContext);
    return user ? children : <Navigate to="/login" />;
};

export default App;

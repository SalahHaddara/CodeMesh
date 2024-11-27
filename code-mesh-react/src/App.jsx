import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {FileProvider} from "./hooks/FileContext.jsx";
import Login from './page/Login';
import WorkspaceScreen from "./page/WorkSpace.jsx";

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login"/>;
    }

    return children;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route
                    path="/workspace"
                    element={
                        <ProtectedRoute>
                            <FileProvider>
                                <WorkspaceScreen/>
                            </FileProvider>
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<Navigate to="/workspace"/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
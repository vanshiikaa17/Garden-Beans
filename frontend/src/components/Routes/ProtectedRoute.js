import { Navigate } from "react-router-dom";
import  React from 'react';



export const ProtectedRoute = ({children, isAuthenticated, loading}) => {
    if(!loading){
        if(isAuthenticated===false){
            return <Navigate to="/login" replace/>
        }
        return children;
    }
}

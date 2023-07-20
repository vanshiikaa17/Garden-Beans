import { Navigate } from "react-router-dom";
import  React from 'react';



export const ProtectedRoute = ({children, isAdmin, isAuthenticated, loading, user}) => {
    if(loading===false){
        if(isAuthenticated===false){
            return <Navigate to="/login" replace/>
        }
        if(isAdmin===true && user.role!=="admin"){
            return <Navigate to="/login" replace/>
        }
        return children;
    }
}

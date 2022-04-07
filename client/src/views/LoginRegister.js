import React, { useState, useEffect } from 'react';
import Login from "../components/Login";
import Register from "../components/Register";


const LoginRegister = (props) => {

    return (
        <div>
            <Login />
            <Register />
        </div>
    )
}


export default LoginRegister;

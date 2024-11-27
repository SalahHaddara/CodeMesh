import axios from "axios";
import React, {useState} from "react";
import '../styles/pages/login.css';
import useForm from "../hooks/useForm";
import {requestAPI} from '../utlis/request.js'
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    localStorage.clear();
    const [error, setError] = useState("");
    const {form, updateForm} = useForm({
        email: "",
        password: "",
    });
    const login = async () => {
        const result = await requestAPI({
            route: "login",
            method: "POST",
            body: form,
        })

        if (result.success) {
            localStorage.setItem('token', result.data.token)
            localStorage.setItem('user', JSON.stringify(result.data.user))
            navigate('/workspace')
        } else {
            setError(result.message)
        }
        console.log(result)
    }

    return (
        <div className="main-login">

            <div className="sub-login">

                <h1>CodeMesh</h1>
                {error && <h2 className="alert">{error}</h2>}

                <div className="login-form">

                    <div>
                        <h3>Email</h3>
                        <input name="email" type="email" placeholder="Enter your email"
                               onChange={updateForm}/>
                    </div>
                    <div>
                        <h3>Password</h3>
                        <input name="password" type="password" placeholder="Enter your Password"
                               onChange={updateForm}/>
                    </div>
                    <div>
                        <button onClick={login}>Sign in</button>
                        <br/>
                        <a href="#">Sign up</a>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Login;
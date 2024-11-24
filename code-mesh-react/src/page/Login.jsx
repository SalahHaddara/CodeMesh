import axios from "axios";
import React from "react";
import '../styles/pages/login.css';
import useForm from "../hooks/useForm";
import { requestAPI } from '../utlis/request.js'

const Login = () => {
    const { form, updateForm } = useForm({
        email: "",
        password: "",
    });
     
    const login = async () =>{
        console.log('form')
        console.log(form)
        const result = await requestAPI({
            route:"login",
            method:"POST",
            body:form,
        })

        localStorage.setItem('token',result.token)
        localStorage.setItem('user',JSON.stringify(result.user))
        

        console.log(result)
    } 
    
    return (
            <div className="main-login">
                <div className="sub-login">
                <h1>CodeMesh</h1>
                    <div className="login-form">
                        <div>
                            <h3>Email</h3>
                            <input name="email" type="email" placeholder="Enter your email"
                                onChange={updateForm}/>
                        </div>
                        <div>
                            <h3>Password</h3>
                            <input name="password" type="password" placeholder="Enter your Password"
                                onChange={updateForm} />
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
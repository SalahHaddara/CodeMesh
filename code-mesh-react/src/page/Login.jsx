import axios from "axios";
import React from "react";
import '../styles/pages/login.css';
import useForm from "../hooks/useForm";

const Login = () => {
    const { form, updateForm } = useForm({
        email: "",
        password: "",
    });

    const fun = async () =>{

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
                            <button onClick={fun}>Sign in</button>
                            <br/>
                            <a href="#">Sign up</a>
                        </div>
                    </div>
                </div>
            </div>
    );

}

export default Login;
import React, { useState } from "react";
import '../styles/pages/login.css';
import useForm from "../hooks/useForm.js";
import { requestAPI } from '../utlis/request.js'
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    localStorage.clear();
    const [error, setError] = useState("");
    
    const { form, updateForm } = useForm({
        email: "",
        password: "",
    });
    const signup = async () =>{
        const result = await requestAPI({
            route:"register",
            method:"POST",
            body:form,
        })

        if(result.success){
            localStorage.setItem('token',result.token)
            localStorage.setItem('user',JSON.stringify(result.user))
        }else{
            setError(result.message)
        }
    } 
    
    return (
            <div className="main-login">
                
                <div className="sub-login">

                <h1>CodeMesh</h1>
                {error && <h2 className="alert">{error}</h2>}

                    <div className="login-form">
                        <div>
                            <h3>Name</h3>
                            <input name="name" type="text" placeholder="Enter your name"
                                onChange={updateForm}/>
                        </div>

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
                            <button onClick={signup}>Sign UP</button>
                            <br/>
                            <a href="#"
                                                    onClick={() => {
                                                        navigate("/login");
                                                    }}
                            
                            >Login</a>
                        </div>
                    </div>
                </div>
            </div>
    );

}

export default Signup;
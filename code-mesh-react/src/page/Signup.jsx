import React, { useState } from "react";
import '../styles/pages/login.css';
import useForm from "../hooks/useForm.js";
import { requestAPI } from '../utlis/request.js'
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    localStorage.clear();
    const [error, setError] = useState("");
    const [succ, setSucc] = useState("");
    
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
        console.log(result)

        if(result.success){
            localStorage.setItem('token',result.data.token)
            localStorage.setItem('user',JSON.stringify(result.data.user))
            console.log(result.data.token)

            setError('')
            setSucc('Your account has been successfully created')
            navigate('/workspace')
        }else{
            setError(result.message)
            setSucc('')
        }
    } 
    
    return (
            <div className="main-login">
                
                <div className="sub-login">

                <h1>CodeMesh</h1>
                {error && <h2 className="alert">{error}</h2>}
                {succ && <h2 className="alert-succ">{succ}</h2>}

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
                            <a 
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
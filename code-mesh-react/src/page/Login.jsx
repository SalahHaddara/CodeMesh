import axios from "axios";
import '../styles/pages/login.css';
import useForm from "../hooks/useForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const { form, updateForm } = useForm({
        email: "",
        password: "",
    });

    const login = async () =>{

    } 
    
    return (
        <>
            <div class="main-login">
                <div class="sub-login">
                <h1>CodeMesh</h1>
                    <div class="login-form">
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
        </>
    );

}

export default Login;
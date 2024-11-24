import axios from "axios";
import '../styles/pages/login.css';

const Login = () => {

    return (
        <>
            <div class="main-login">
                <div class="sub-login">
                <h1>CodeMesh</h1>
                    <div class="login-form">
                        <div>
                            <h3>Email</h3>
                            <input type="text" placeholder="Enter your email"/>
                        </div>
                        <div>
                            <h3>Password</h3>
                            <input type="password" placeholder="Enter your Password"/>
                        </div>
                        <div>
                            <button>Sign in</button>
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
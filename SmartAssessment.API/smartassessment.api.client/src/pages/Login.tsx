import { useState } from "react";
import api from "../api/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {

        try {

            const response = await api.post("/Auth/login", {

                email,
                password

            });
            localStorage.setItem("token", response.data.token);
            const { token, role } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            if (role === "Instructor") {
                navigate("/instructor");
            } else {
                navigate("/student");
            }

        }
        catch (error) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                console.log(error.response?.status);
                console.log(error.response?.data);
            }

            alert("Login Failed");
        }
    };

    return (

        <div>

            <h1>Login</h1>
            
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <br />
            <br />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <br />
            <br />

            <button onClick={handleLogin}>
                Login
            </button>

        </div>

    );

}

export default Login;
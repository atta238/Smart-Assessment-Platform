import { useState } from "react";
import api from "../api/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Login() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token)
            return;

        if (role === "Instructor")
            navigate("/instructor", { replace: true });

        else if (role === "Student")
            navigate("/student", { replace: true });

    }, [navigate]);
    const handleLogin = async () => {

        try {

            const response = await api.post("/Auth/login", {

                email,
                password

            });
            const { token, role } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            if (role === "Instructor") {
                navigate("/instructor", { replace: true });
            } else {
                navigate("/student", { replace: true });
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

            <br />
            <br />

            <button onClick={() => navigate("/signup")}>
                Don't have an account? Sign Up
            </button>

        </div>

    );

}

export default Login;
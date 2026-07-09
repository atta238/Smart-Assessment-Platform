import { useState } from "react";
import api from "../api/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Signup() {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {

        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token)
            return;

        navigate(role === "Instructor" ? "/instructor" : "/student", {
            replace: true
        });

    }, [navigate]);
    const handleRegister = async () => {

        try {
            if (!fullName.trim() || !email.trim() || !password.trim()) {
                alert("Please fill all fields");
                return;
            }
            await api.post("/Auth/register", {

                fullName,
                email,
                password

            });

            alert("Registration Successful");

            navigate("/login", { replace: true });

        }
        catch (error) {

            console.log(error);

            if (axios.isAxiosError(error)) {
                console.log(error.response?.status);
                console.log(error.response?.data);
            }

            if (axios.isAxiosError(error)) {
                alert(error.response?.data || "Registration Failed");
            } else {
                alert("Registration Failed");
            }

        }

    };

    return (

        <div>

            <h1>Sign Up</h1>

            <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />

            <br />
            <br />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br />
            <br />
            
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />

            <button onClick={handleRegister}>
                Sign Up
            </button>

            <br />
            <br />

            <button onClick={() => navigate("/login", { replace: true })}>
                Already have an account? Login
            </button>

        </div>

    );

}

export default Signup;
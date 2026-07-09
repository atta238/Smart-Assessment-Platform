import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/");

    };

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px 30px",
                background: "#1e293b",
                color: "white"
            }}
        >

            <h2 style={{ cursor: "pointer" }}>
                Smart Assessment
            </h2>

            {!location.pathname.startsWith("/solve-exam") && (

                <div>

                    <button
                        onClick={() => {

                            const role = localStorage.getItem("role");

                            if (role === "Instructor")
                                navigate("/instructor");
                            else
                                navigate("/student");

                        }}
                    >
                        Home
                    </button>

                    <button onClick={handleLogout}>
                        Logout
                    </button>

                </div>

            )}

        </div>

    );

}

export default Navbar;
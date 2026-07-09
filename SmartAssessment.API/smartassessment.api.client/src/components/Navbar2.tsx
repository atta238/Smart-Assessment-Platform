import { useNavigate, useLocation } from "react-router-dom";

function Navbar2() {

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
                    <button onClick={handleLogout}>
                        Logout
                    </button>

                </div>

            )}

        </div>

    );

}

export default Navbar2;
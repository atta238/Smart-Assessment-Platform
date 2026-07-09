import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";


function Result() {

    useEffect(() => {
        window.history.pushState(null, "", window.location.href);

        const handleBack = () => {
            window.history.pushState(null, "", window.location.href);
        };

        window.addEventListener("popstate", handleBack);

        return () => {
            window.removeEventListener("popstate", handleBack);
        };
    }, []);

    const { state } = useLocation();

    if (!state) {
        return <h2>No Result Found</h2>;
    }

    return (
        <>
            <Navbar />
        <div style={{ textAlign: "center", marginTop: "50px" }}>

            <h1>Exam Result</h1>

            <h2>Total Score: {state.totalScore}</h2>

            <h2>Percentage: {state.percentage}%</h2>

            <h2>
                {state.isPassed ? "Passed" : "Failed"}
            </h2>

            </div>
        </>
    );
}

export default Result;
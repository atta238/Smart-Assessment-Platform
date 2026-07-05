import { useLocation } from "react-router-dom";

function Result() {

    const { state } = useLocation();

    if (!state) {
        return <h2>No Result Found</h2>;
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>

            <h1>Exam Result</h1>

            <h2>Total Score: {state.totalScore}</h2>

            <h2>Percentage: {state.percentage}%</h2>

            <h2>
                {state.isPassed ? "Passed" : "Failed"}
            </h2>

        </div>
    );
}

export default Result;
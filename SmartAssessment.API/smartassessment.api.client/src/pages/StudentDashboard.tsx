import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
    const navigate = useNavigate();
    const [exams, setExams] = useState<any[]>([]);

    useEffect(() => {

        const getExams = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await api.get("/Exam", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log(response.data);

                setExams(response.data);

            }
            catch (error) {

                console.log(error);

            }

        };

        getExams();

    }, []);

    return (

        <div>

            <h1>Student Dashboard</h1>

            {exams.map((exam) => (

                <div
                    key={exam.id}
                    style={{
                        border: "1px solid gray",
                        padding: "15px",
                        marginBottom: "15px",
                        width: "400px"
                    }}
                >

                    <h2>{exam.title}</h2>

                    <p>{exam.description}</p>

                    <p>Duration: {exam.duration} Minutes</p>

                    <button
                        onClick={() => navigate(`/solve-exam/${exam.id}`)}
                    >
                        Start Exam
                    </button>

                </div>

            ))}

        </div>

    );

}

export default StudentDashboard;

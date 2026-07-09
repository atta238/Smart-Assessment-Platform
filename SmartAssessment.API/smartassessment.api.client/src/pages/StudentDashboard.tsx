import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar2 from "../components/Navbar2";
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

                setExams(response.data);

            }
            catch (error) {

                console.log(error);

            }

        };

        getExams();

    }, []);

    async function startExam(examId: number) {

        try {

            await api.post(`/Student/start/${examId}`);

            navigate(`/solve-exam/${examId}`);

        }
        catch (err) {

            if (axios.isAxiosError(err)) {
                alert(err.response?.data || "Unable to start exam");
            } else {
                alert("Unable to start exam");
            }

        }

    }

    return ( 

        <>
        <Navbar2 />

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

                    <button onClick={() => startExam(exam.id)}>
                        Start Exam
                    </button>

                </div>

            ))}

        </div>

        </>
    );

}

export default StudentDashboard;
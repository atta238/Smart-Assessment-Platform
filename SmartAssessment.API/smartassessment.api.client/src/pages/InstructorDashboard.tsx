import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Navbar2 from "../components/Navbar2";
function InstructorDashboard() {

    const navigate = useNavigate();

    const [exams, setExams] = useState<any[]>([]);

    useEffect(() => {

        api.get("/Exam")
            .then((res) => {

                console.log(res.data);
                setExams(res.data);

            })
            .catch((err) => {

                console.log(err);

            });

    }, []);

    const handleDelete = async (id: number) => {

        if (!window.confirm("Are you sure you want to delete this exam?"))
            return;

        try {

            await api.delete(`/Exam/${id}`);

            setExams(exams.filter(x => x.id !== id));

            alert("Exam Deleted Successfully");

        }
        catch (err) {

            console.log(err);

        }

    };

    return (

        <>
            <Navbar2 />

        <div style={{ padding: "30px" }}>

            <h1>Instructor Dashboard</h1>

            <button
                onClick={() => navigate("/create-exam")}
                style={{
                    marginBottom: "20px",
                    padding: "10px 20px"
                }}
            >
                Create Exam
            </button>

            {exams.map((exam) => (

                <div
                    key={exam.id}
                    style={{
                        border: "1px solid gray",
                        padding: "20px",
                        marginBottom: "20px"
                    }}
                >

                    <h2>{exam.title}</h2>

                    <p>{exam.description}</p>

                    <p>
                        <strong>Duration:</strong> {exam.duration} Minutes
                    </p>

                    <button
                        onClick={() => navigate(`/edit-exam/${exam.id}`)}
                    >
                        Edit
                    </button>

                    <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => handleDelete(exam.id)}
                    >
                        Delete
                    </button>

                    <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => navigate(`/questions/${exam.id}`)}
                    >
                        Questions
                    </button>
                   

                </div>

            ))}

        </div>
        </>
    );

}

export default InstructorDashboard;
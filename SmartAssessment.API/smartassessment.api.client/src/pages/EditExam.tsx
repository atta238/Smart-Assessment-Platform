import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

function EditExam() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [exam, setExam] = useState({
        title: "",
        description: "",
        duration: 60,
        startTime: "",
        endTime: "",
        passPercentage: 50,
        instructorId: 2
    });

    useEffect(() => {

        api.get(`/Exam/${id}`)
            .then(res => {

                setExam(res.data);

            });

    }, [id]);

    const handleChange = (e: any) => {

        setExam({
            ...exam,
            [e.target.name]:
                e.target.type === "number"
                    ? Number(e.target.value)
                    : e.target.value
        });

    };

    const handleSubmit = () => {

        api.put(`/Exam/${id}`, exam)
            .then(() => {

                alert("Exam Updated Successfully");

                navigate("/instructor");

            });

    };

    return (

        <div style={{ width: "500px", margin: "50px auto" }}>

            <h1>Edit Exam</h1>

            <input
                name="title"
                value={exam.title}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "10px" }}
            />

            <input
                name="description"
                value={exam.description}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "10px" }}
            />

            <input
                type="number"
                name="duration"
                value={exam.duration}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "10px" }}
            />

            <input
                type="datetime-local"
                name="startTime"
                value={exam.startTime?.substring(0, 16)}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "10px" }}
            />

            <input
                type="datetime-local"
                name="endTime"
                value={exam.endTime?.substring(0, 16)}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "10px" }}
            />

            <input
                type="number"
                name="passPercentage"
                value={exam.passPercentage}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "20px" }}
            />

            <button
                onClick={handleSubmit}
                style={{ width: "100%", height: "40px" }}
            >
                Update Exam
            </button>

        </div>

    );

}

export default EditExam;
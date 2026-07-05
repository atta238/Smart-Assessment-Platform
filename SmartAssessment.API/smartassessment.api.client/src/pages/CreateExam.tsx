import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function CreateExam() {

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

        api.post("/Exam", exam)
            .then(() => {

                alert("Exam Created Successfully");

                navigate("/instructor");

            })
            .catch(err => {

                console.log(err);

            });

    };

    return (

        <div style={{ width: "500px", margin: "50px auto" }}>

            <h1>Create Exam</h1>

            <input
                name="title"
                placeholder="Title"
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "10px" }}
            />

            <input
                name="description"
                placeholder="Description"
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "10px" }}
            />

            <input
                type="number"
                name="duration"
                placeholder="Duration"
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "10px" }}
            />

            <input
                type="datetime-local"
                name="startTime"
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "10px" }}
            />

            <input
                type="datetime-local"
                name="endTime"
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "10px" }}
            />

            <input
                type="number"
                name="passPercentage"
                placeholder="Pass Percentage"
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "20px" }}
            />

            <button
                onClick={handleSubmit}
                style={{ width: "100%", height: "40px" }}
            >
                Create Exam
            </button>

        </div>

    );
}

export default CreateExam;
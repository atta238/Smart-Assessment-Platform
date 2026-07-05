import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

function ManageQuestions() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {

        loadQuestions();

    }, []);

    const loadQuestions = () => {

        api.get(`/Question/exam/${id}`)
            .then(res => {

                setQuestions(res.data);

            })
            .catch(console.log);

    };

    return (

        <div style={{ width: "900px", margin: "40px auto" }}>

            <h1>Manage Questions</h1>

            <button
                onClick={() => navigate(`/add-question/${id}`)}
            >
                Add Question
            </button>

            <br />
            <br />

            {

                questions.map((question: any, index) => (

                    <div
                        key={question.id}
                        style={{
                            border: "1px solid gray",
                            padding: "20px",
                            marginBottom: "20px"
                        }}
                    >

                        <h3>

                            {index + 1}. {question.questionText}

                        </h3>

                        <p>

                            Score : {question.score}

                        </p>

                        <button
                            onClick={() => navigate(`/edit-question/${question.id}`)}
                        >
                            Edit
                        </button>

                        <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => {

                                api.delete(`/Question/${question.id}`)
                                    .then(() => {

                                        loadQuestions();

                                    });

                            }}
                        >
                            Delete
                        </button>

                    </div>

                ))

            }

        </div>

    );

}

export default ManageQuestions;
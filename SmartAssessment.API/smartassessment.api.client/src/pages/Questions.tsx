import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

function Questions() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {

        api.get(`/Question/exam/${id}`)
            .then((res) => {

                setQuestions(res.data);

            })
            .catch((err) => {

                console.log(err);

            });

    }, [id]);

    const handleDelete = async (questionId: number) => {

        if (!window.confirm("Delete this question?"))
            return;

        try {

            await api.delete(`/Question/${questionId}`);

            setQuestions(
                questions.filter(q => q.id !== questionId)
            );

            alert("Question Deleted Successfully");

        }
        catch (err) {

            console.log(err);

        }

    };

    return (

        <div style={{ width: "70%", margin: "auto" }}>

            <h1>Questions</h1>

            <button
                onClick={() => navigate(`/add-question/${id}`)}
            >
                Add New Question
            </button>

            <br /><br />

            {

                questions.map((question, index) => (

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

                        {

                            question.choices.map((choice: any) => (

                                <div key={choice.id}>

                                    {choice.choiceText}

                                    {

                                        choice.isCorrect &&
                                        <b> ?</b>

                                    }

                                </div>

                            ))

                        }

                        <br />

                        <button
                            onClick={() =>
                                navigate(`/edit-question/${question.id}`)
                            }
                        >
                            Edit
                        </button>

                        <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => handleDelete(question.id)}
                        >
                            Delete
                        </button>

                    </div>

                ))

            }

        </div>

    );

}

export default Questions;
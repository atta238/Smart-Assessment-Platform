import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { useNavigate } from "react-router-dom";


function SolveExam() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [questions, setQuestions] = useState<any[]>([]);
    const [answers, setAnswers] = useState<{ [key: number]: number }>({});

    useEffect(() => {

        api.get(`/Question/exam/${id}`)
            .then((res) => {

                console.log(res.data);
                setQuestions(res.data);

            })
            .catch((err) => {

                console.log(err);

            });

    }, [id]);

    const handleSubmit = () => {

        const request = {
            examId: Number(id),
            answers: Object.entries(answers).map(([questionId, choiceId]) => ({
                questionId: Number(questionId),
                choiceId: choiceId
            }))
        };

        console.log(request);

        api.post("/Student/submit", request)
            .then((res) => {

                console.log(res.data);
                navigate("/result", {
                    state: res.data
                });

            })
            .catch((err) => {

                console.log(err);

            });

    };

    return (
        <div>

            <h1>Solve Exam</h1>

            {questions.map((question, index) => (

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

                    {question.choices.map((choice: any) => (

                        <div key={choice.id}>

                            <label>

                                <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    value={choice.id}
                                    checked={answers[question.id] === choice.id}
                                    onChange={() =>
                                        setAnswers({
                                            ...answers,
                                            [question.id]: choice.id
                                        })
                                    }
                                />

                                {choice.choiceText}

                            </label>

                        </div>

                    ))}

                </div>

            ))}

            <button onClick={handleSubmit}>
                Submit Exam
            </button>

        </div>
    );

}

export default SolveExam;
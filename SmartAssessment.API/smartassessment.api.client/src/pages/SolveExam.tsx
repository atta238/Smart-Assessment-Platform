import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

function SolveExam() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [questions, setQuestions] = useState<any[]>([]);
    const [answers, setAnswers] = useState<{ [key: number]: number }>({});
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {

        api.get(`/Question/exam/${id}`)
            .then((res) => {
                setQuestions(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        api.get(`/Student/remaining-time/${id}`)
            .then((res) => {
                setTimeLeft(res.data.remainingSeconds);
            })
            .catch((err) => {
                console.log(err);
            });

    }, [id]);

    useEffect(() => {

        if (timeLeft === null || timeLeft <= 0 || submitted)
            return;

        const timer = setInterval(() => {

            setTimeLeft(prev => {

                if (prev === null)
                    return null;

                if (prev <= 1) {

                    clearInterval(timer);

                    return 0;

                }

                return prev - 1;

            });

        }, 1000);

        return () => clearInterval(timer);

    }, [timeLeft, submitted]);

    useEffect(() => {

        if (timeLeft !== 0 || submitted)
            return;

        handleSubmit(true);

    }, [timeLeft, submitted]);

    function handleSubmit(isAuto = false) {

        if (submitted)
            return;

        setSubmitted(true);

        const request = {
            examId: Number(id),
            answers: Object.entries(answers).map(([questionId, choiceId]) => ({
                questionId: Number(questionId),
                choiceId: choiceId
            }))
        };

        api.post("/Student/submit", request)
            .then((res) => {

                if (isAuto)
                    alert("Time Up!");

                navigate("/result", {
                    state: res.data
                });

            })
            .catch((err) => {

                console.log(err.response?.data);

                setSubmitted(false);

            });

    }

    const minutes = Math.floor((timeLeft ?? 0) / 60);
    const seconds = (timeLeft ?? 0) % 60;

    return (
        <div>

            <h1>Solve Exam</h1>

            <h2>
                Time Left: {minutes}:{seconds.toString().padStart(2, "0")}
            </h2>

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

            <button
                onClick={() => handleSubmit(false)}
                disabled={submitted}
            >
                Submit Exam
            </button>

        </div>
    );

}

export default SolveExam;
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

function AddQuestion() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [questionText, setQuestionText] = useState("");
    const [score, setScore] = useState(5);

    const [choices, setChoices] = useState([
        "",
        "",
        "",
        ""
    ]);

    const [correctChoice, setCorrectChoice] = useState(0);

    const handleChoiceChange = (index: number, value: string) => {

        const temp = [...choices];
        temp[index] = value;
        setChoices(temp);

    };

    const handleSubmit = async () => {

        try {

            const questionRes = await api.post("/Question", {
                examId: Number(id),
                questionText,
                score
            });

            const questionId = questionRes.data.id;

            for (let i = 0; i < 4; i++) {

                await api.post("/Choice", {
                    questionId,
                    choiceText: choices[i],
                    isCorrect: i === correctChoice
                });

            }

            alert("Question Added Successfully");

            navigate(`/questions/${id}`);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div style={{ width: "600px", margin: "40px auto" }}>

            <h1>Add Question</h1>

            <input
                placeholder="Question"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
            />

            <input
                type="number"
                placeholder="Score"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                style={{ width: "100%", marginBottom: "20px" }}
            />

            {choices.map((choice, index) => (

                <div key={index} style={{ marginBottom: "10px" }}>

                    <input
                        style={{ width: "80%" }}
                        placeholder={`Choice ${index + 1}`}
                        value={choice}
                        onChange={(e) =>
                            handleChoiceChange(index, e.target.value)
                        }
                    />

                    <input
                        type="radio"
                        checked={correctChoice === index}
                        onChange={() => setCorrectChoice(index)}
                    />

                    Correct

                </div>

            ))}

            <button onClick={handleSubmit}>
                Add Question
            </button>

        </div>

    );

}

export default AddQuestion;
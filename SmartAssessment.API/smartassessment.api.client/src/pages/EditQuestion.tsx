import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

function EditQuestion() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [examId, setExamId] = useState(0);
    const [questionText, setQuestionText] = useState("");
    const [score, setScore] = useState(0);
    const [choices, setChoices] = useState<any[]>([]);

    useEffect(() => {

        api.get(`/Question/${id}`)
            .then(async (res) => {

                setQuestionText(res.data.questionText);
                setScore(res.data.score);
                setExamId(res.data.examId);

                const allQuestions = await api.get(`/Question/exam/${res.data.examId}`);

                const question = allQuestions.data.find((q: any) => q.id == id);

                setChoices(question.choices);

            })
            .catch(console.log);

    }, [id]);

    const handleChoice = (index: number, value: string) => {

        const arr = [...choices];
        arr[index].choiceText = value;
        setChoices(arr);

    };

    const handleCorrect = (index: number) => {

        const arr = choices.map((c: any, i: number) => ({
            ...c,
            isCorrect: i === index
        }));

        setChoices(arr);

    };

    const handleSubmit = async () => {

        try {

            await api.put(`/Question/${id}`, {

                examId: examId,
                questionText,
                score

            });

            for (const choice of choices) {

                await api.put(`/Choice/${choice.id}`, {

                    questionId: choice.questionId,
                    choiceText: choice.choiceText,
                    isCorrect: choice.isCorrect

                });

            }

            alert("Question Updated Successfully");

            navigate(-1);

        }
        catch (err) {

            console.log(err);

        }

    };

    return (

        <div style={{ width: "60%", margin: "auto" }}>

            <h1>Edit Question</h1>

            <input
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Question"
                style={{ width: "100%", marginBottom: "10px" }}
            />

            <input
                type="number"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                style={{ width: "100%", marginBottom: "20px" }}
            />

            {

                choices.map((choice: any, index: number) => (

                    <div key={choice.id}>

                        <input
                            value={choice.choiceText}
                            onChange={(e) =>
                                handleChoice(index, e.target.value)
                            }
                            style={{ width: "80%" }}
                        />

                        <input
                            type="radio"
                            checked={choice.isCorrect}
                            onChange={() => handleCorrect(index)}
                        />

                        Correct

                        <br /><br />

                    </div>

                ))

            }

            <button onClick={handleSubmit}>
                Update Question
            </button>

        </div>

    );

}

export default EditQuestion;
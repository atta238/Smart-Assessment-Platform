import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import InstructorDashboard from "./pages/InstructorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import CreateExam from "./pages/CreateExam";
import SolveExam from "./pages/SolveExam";
import Result from "./pages/Result";
import ManageQuestions from "./pages/ManageQuestions";
import AddQuestion from "./pages/AddQuestion";
import EditExam from "./pages/EditExam";
import Questions from "./pages/Questions";
import EditQuestion from "./pages/EditQuestion";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/instructor" element={<InstructorDashboard />} />
                <Route path="/create-exam" element={<CreateExam />} />
                <Route path="/questions/:id" element={<ManageQuestions />} />
                <Route path="/add-question/:id" element={<AddQuestion />} />
                <Route path="/student" element={<StudentDashboard />} />
                <Route path="/questions/:id" element={<Questions />} />
                <Route path="/edit-exam/:id" element={<EditExam />} />
                <Route path="/edit-question/:id" element={<EditQuestion />} />
                <Route
                    path="/solve-exam/:id"
                    element={<SolveExam />}
                />
                <Route path="/result" element={<Result />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
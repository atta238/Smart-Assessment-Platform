import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import InstructorDashboard from "./pages/InstructorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import CreateExam from "./pages/CreateExam";
import SolveExam from "./pages/SolveExam";
import Result from "./pages/Result";
import AddQuestion from "./pages/AddQuestion";
import EditExam from "./pages/EditExam";
import Questions from "./pages/Questions";
import EditQuestion from "./pages/EditQuestion";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route
                    path="/instructor"
                    element={
                        <ProtectedRoute role="Instructor">
                            <InstructorDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/create-exam"
                    element={
                        <ProtectedRoute role="Instructor">
                            <CreateExam />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-question/:id"
                    element={
                        <ProtectedRoute role="Instructor">
                            <AddQuestion />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/questions/:id"
                    element={
                        <ProtectedRoute role="Instructor">
                            <Questions />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-exam/:id"
                    element={
                        <ProtectedRoute role="Instructor">
                            <EditExam />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-question/:id"
                    element={
                        <ProtectedRoute role="Instructor">
                            <EditQuestion />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student"
                    element={
                        <ProtectedRoute role="Student">
                            <StudentDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/solve-exam/:id"
                    element={
                        <ProtectedRoute role="Student">
                            <SolveExam />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/result"
                    element={
                        <ProtectedRoute role="Student">
                            <Result />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
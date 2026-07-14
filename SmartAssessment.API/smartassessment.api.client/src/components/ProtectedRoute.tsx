import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
    role?: string;
};

function ProtectedRoute({ children, role }: Props) {

    const token = sessionStorage.getItem("token");
    const userRole = sessionStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (role && userRole !== role) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
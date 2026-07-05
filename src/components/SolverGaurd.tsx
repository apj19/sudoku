import { Navigate } from "react-router-dom";

export default function SolverGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const canAccess = sessionStorage.getItem("allowSolverAccess");

  if (canAccess) {
    sessionStorage.removeItem("allowSolverAccess");
  } else {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.user);
  const alert = useAlert();

  if (user && !user.isAdmin) {
    alert.error("You can't access this resource");
    return;
  }

  return <>{user && user.isAdmin ? <Outlet /> : <Navigate to={"/"} />}</>;
};

export default ProtectedRoute;

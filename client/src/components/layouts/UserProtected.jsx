import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserProtected = () => {
  const { user } = useSelector((state) => state.user);
  const alert = useAlert();

  if (!user) {
    alert.error("You can't access this resource without loggin in");
  }

  return <>{user ? <Outlet /> : <Navigate to={"/login"} />}</>;
};

export default UserProtected;

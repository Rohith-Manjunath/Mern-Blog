import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  clearError,
  clearMessage,
  clearSuccess,
  logout,
  resetUser,
} from "../../Redux/UserSlice";
import { useAlert } from "react-alert";
import Loader from "./Loader";

const Navbar = () => {
  const { user, message, loading, error, success } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const currentPath = path.split("/")[1];

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(resetUser());
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (success) {
      alert.success(message);
      dispatch(clearSuccess());
      dispatch(clearMessage());
      navigate("/login");
    }
  }, [error, alert, success, message, dispatch, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="py-3 px-6 bg-gray-300 flex items-center justify-between">
      <Link to={"/"} className="text-3xl font-semibold text-slate-700 italic">
        Blogify
      </Link>

      <div className="">
        <div className="mb-2 flex items-center justify-center bg-white p-2 rounded-md">
          <input
            type="text "
            placeholder="Search..."
            className="outline-none border-none"
          />
          <span>
            <CiSearch className="text-xl text-gray-600" />
          </span>
        </div>
      </div>

      <div>
        <ul className="font-semibold text-gray-600 flex items-center justify-center gap-10">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/blogs"}>Blogs</NavLink>
          </li>
          <li>
            <NavLink to={"/about"}>About</NavLink>
          </li>
          <li>
            {" "}
            <NavLink to={"/contact"}>Contact</NavLink>
          </li>
          {user && user.isAdmin && (
            <li>
              {" "}
              <NavLink to={"/admin"}>Admin</NavLink>
            </li>
          )}
        </ul>
      </div>

      {user ? (
        <Link to={"/login"} onClick={handleLogout}>
          <button className="tracking-wide font-semibold bg-black text-white py-2 px-2 rounded-md hover:cursor-pointer hover:opacity-80 transition-all duration-200">
            Logout
          </button>
        </Link>
      ) : currentPath === "login" ? (
        <Link to={"/register"}>
          <button className="tracking-wide font-semibold bg-black text-white py-2 px-2 rounded-md hover:cursor-pointer hover:opacity-80 transition-all duration-200">
            Register
          </button>
        </Link>
      ) : (
        <Link to={"login"}>
          <button className="tracking-wide font-semibold bg-black text-white py-2 px-2 rounded-md hover:cursor-pointer hover:opacity-80 transition-all duration-200">
            Login
          </button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;

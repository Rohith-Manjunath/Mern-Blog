import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../Redux/User";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import Loader from "./Loader";
import { clearUser } from "../../Redux/UserSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const path = useLocation().pathname.split("/")[1];
  const alert = useAlert();
  const dispatch = useDispatch();
  const [logoutUser, { isLoading, isError, error }] = useLogoutUserMutation();
  console.log(path);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(error.data.err);
    }
  }, [isError, alert, error]);

  if (isLoading) {
    return <Loader />;
  }

  const handleLogout = async () => {
    try {
      const data = await logoutUser().unwrap();
      alert.success(data.message);
      dispatch(clearUser());
      navigate("/login");
    } catch (e) {
      alert.error(e.message);
    }
  };

  return (
    <>
      <div className="py-3 px-6 bg-gray-300 flex items-center justify-between">
        <Link to={"/"} className="text-3xl font-semibold text-slate-700 italic">
          Blogify
        </Link>

        <div>
          <ul className="font-semibold text-gray-600 flex items-center justify-center gap-10">
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/blogs"}>Blogs</NavLink>
            </li>
            <li>
              <NavLink to={"/my-blogs"}>My Blogs</NavLink>
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

        <div>
          {user ? (
            <Link to={"/login"} onClick={handleLogout}>
              <button className="tracking-wide font-semibold bg-black text-white py-2 px-2 rounded-md hover:cursor-pointer hover:opacity-80 transition-all duration-200">
                Logout
              </button>
            </Link>
          ) : path && path === "register" ? (
            <Link to={"/login"}>
              <button className="tracking-wide font-semibold bg-black text-white py-2 px-2 rounded-md hover:cursor-pointer hover:opacity-80 transition-all duration-200">
                Login
              </button>
            </Link>
          ) : (
            <Link to={"/register"}>
              <button className="tracking-wide font-semibold bg-black text-white py-2 px-2 rounded-md hover:cursor-pointer hover:opacity-80 transition-all duration-200">
                Register
              </button>
            </Link>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Navbar;

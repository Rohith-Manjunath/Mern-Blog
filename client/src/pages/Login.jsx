import { useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { TbPasswordFingerprint } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  clearError,
  clearMessage,
  clearSuccess,
  loginUser,
} from "../Redux/UserSlice";
import { Spinner } from "flowbite-react";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, message, success, loading } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (success) {
      alert.success(message);
      dispatch(clearMessage());
      dispatch(clearSuccess());
      navigate("/");
    }
  }, [error, alert, success, message, navigate, dispatch]);

  return (
    <div className="max-w-[70%] w-full mx-auto flex items-center justify-center flex-col gap-4 mt-24">
      <form
        onSubmit={handleSubmit}
        action="
        "
        className="flex items-center justify-center flex-col gap-4 border border-slate-300 py-10 px-10 rounded-lg"
      >
        <h1 className="text-3xl font-semibold text-slate-700">Login</h1>

        <div className="border border-slate-300 rounded-md">
          <div className="flex items-center justify-center bg-white p-2 rounded-md">
            <input
              onChange={handleChange}
              required
              name="email"
              type="email "
              placeholder="Enter your email"
              className="outline-none border-none"
            />
            <span>
              <HiOutlineMail className="text-xl text-gray-600" />
            </span>
          </div>
        </div>
        <div className="border border-slate-300 rounded-md">
          <div className="flex items-center justify-center bg-white p-2 rounded-md">
            <input
              onChange={handleChange}
              required
              name="password"
              type="password "
              placeholder="Enter your password"
              className="outline-none border-none"
            />
            <span>
              <TbPasswordFingerprint className="text-xl text-gray-600" />
            </span>
          </div>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="w-full tracking-wide font-semibold bg-black text-white py-2 px-2 rounded-md hover:cursor-pointer hover:opacity-80 transition-all duration-200"
        >
          {loading ? (
            <Spinner color="info" aria-label="Info spinner example" />
          ) : (
            "Login"
          )}
        </button>

        <p>
          Not a user yet ?{" "}
          <span className="text-sm font-semibold">
            <Link to={"/register"} className="text-blue-500">
              Register
            </Link>
          </span>{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;

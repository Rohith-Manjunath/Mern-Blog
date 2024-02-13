import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { TbPasswordFingerprint } from "react-icons/tb";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="max-w-[70%] w-full mx-auto flex items-center justify-center flex-col gap-4 mt-24">
      <form
        onSubmit={handleSubmit}
        action="
        "
        className="flex items-center justify-center flex-col gap-4 border border-slate-300 py-10 px-10 rounded-lg"
      >
        <h1 className="text-3xl font-semibold text-slate-700">Register</h1>
        <div className="border border-slate-300 rounded-md">
          <div className="flex items-center justify-center bg-white p-2 rounded-md">
            <input
              name="name"
              onChange={handleChange}
              required
              type="text "
              placeholder="Enter your name"
              className="outline-none border-none"
            />
            <span>
              <FaPen className="text-xl text-gray-600" />
            </span>
          </div>
        </div>
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
          type="submit"
          className="w-full tracking-wide font-semibold bg-black text-white py-2 px-2 rounded-md hover:cursor-pointer hover:opacity-80 transition-all duration-200"
        >
          Register
        </button>

        <p>
          Already have an account ?{" "}
          <span className="text-sm font-semibold">
            <Link to={"/login"} className="text-blue-500">
              Login
            </Link>
          </span>{" "}
        </p>
      </form>
    </div>
  );
};

export default Register;

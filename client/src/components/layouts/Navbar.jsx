import { Link, NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
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
            <NavLink to={"/about"}>About</NavLink>
          </li>
          <li>
            {" "}
            <NavLink to={"/contact"}>Contact</NavLink>
          </li>
        </ul>
      </div>

      <Link to={"/register"}>
        <button className="tracking-wide font-semibold bg-black text-white py-2 px-2 rounded-md hover:cursor-pointer hover:opacity-80 transition-all duration-200">
          Register
        </button>
      </Link>
    </div>
  );
};

export default Navbar;

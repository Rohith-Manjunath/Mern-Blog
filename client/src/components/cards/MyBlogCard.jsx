import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const MyBlogCard = ({ image, description, title, id }) => {
  return (
    <>
      <div className="border border-slate-300 p-4 rounded-md space-y-4">
        <div className="">
          <img
            src={image.url}
            alt=""
            loading="lazy"
            className="rounded-md w-full h-[250px]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-center">
            <h2 className="font-semibold text-[18px]">{title}</h2>
            <div className="flex justify-between mt-2 gap-2">
              <button className="text-blue-500">
                <Link to={`/edit/${id}`}>
                  <FaEdit />
                </Link>
              </button>
            </div>
          </div>
          <p className="description overflow-hidden line-clamp-6 text-slate-600">
            {description}
          </p>
          <Link
            to={`/blog/${id}`}
            className="text-center font-semibold bg-black p-2 text-white tracking-wide rounded-md hover:opacity-80 transition-all duration-300"
          >
            Read More
          </Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default MyBlogCard;

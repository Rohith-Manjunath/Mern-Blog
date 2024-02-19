import { Link } from "react-router-dom";

const BlogCard = ({ image, description, title, id, user }) => {
  return (
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
        <h2 className="font-semibold text-[18px] ">{title}</h2>
        {user._id && (
          <h3 className="font-semibold text-slate-600  text-sm tracking-wide">
            By : {user.name}
          </h3>
        )}
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
  );
};

export default BlogCard;

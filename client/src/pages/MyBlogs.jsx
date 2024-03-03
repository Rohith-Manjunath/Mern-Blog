import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { useDeleteBlogMutation, useGetMyBlogsQuery } from "../Redux/BlogAuth";
import Loader from "../components/layouts/Loader";

const MyBlogs = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch } = useGetMyBlogsQuery();
  const [deleteBlog, { isLoading: deleteLoading }] = useDeleteBlogMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error.data.err);
    }
  }, [isError, error]);

  const handleDeleteBlog = async (id) => {
    try {
      await deleteBlog(id).unwrap();
      toast.success("Blog deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Error deleting blog");
    }
  };

  if (isLoading || deleteLoading) {
    return <Loader />;
  }

  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-4 p-6 gap-4">
        {data?.blogs.length > 0 ? (
          data.blogs.map((blog) => (
            <div
              key={blog._id}
              className="border border-slate-300 p-4 rounded-md space-y-4"
            >
              <div className="">
                <img
                  src={blog.image.url}
                  alt=""
                  loading="lazy"
                  className="rounded-md w-full h-[250px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-center ">
                  <h2 className="font-semibold text-[18px] ">{blog.title}</h2>
                  <div className="flex justify-between mt-2 gap-2">
                    <button
                      disabled={false}
                      className="text-red-500"
                      onClick={() => handleDeleteBlog(blog._id)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="text-blue-500"
                      onClick={() => navigate(`/edit/${blog._id}`)}
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
                <p className="description overflow-hidden line-clamp-6 text-slate-600">
                  {blog.description}
                </p>
                <Link
                  to={`/blog/${blog._id}`}
                  className="text-center font-semibold bg-black p-2 text-white tracking-wide rounded-md hover:opacity-80 transition-all duration-300"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="w-screen h-screen flex items-center justify-center">
            <h2 className="text-2xl text-gray-500 font-semibold tracking-wide ">
              No blogs found
            </h2>
          </div>
        )}
      </div>
    </>
  );
};

export default MyBlogs;

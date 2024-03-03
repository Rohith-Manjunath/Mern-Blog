import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetBlogByIdQuery,
  useGetMyBlogsQuery,
  useUpdateBlogMutation,
} from "../Redux/BlogAuth";
import Loader from "../components/layouts/Loader";

const EditBlog = () => {
  const blogId = useLocation().pathname.split("/")[2];
  const {
    data,
    isLoading,
    isError,
    error,
    refetch: blogrefetch,
  } = useGetBlogByIdQuery(blogId);
  const [
    updateBlog,
    { isLoading: updateLoading, isError: isUpdateError, error: updateError },
  ] = useUpdateBlogMutation();
  const navigate = useNavigate();
  const { refetch } = useGetMyBlogsQuery();
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const { title, description } = data.blog;
      setForm({ title, description });
    }
  }, [data, isLoading, isError]);

  useEffect(() => {
    if (isUpdateError) {
      toast.error(updateError.data.err);
    }
    if (isError) {
      toast.error(error.data.err);
    }
  }, [isUpdateError, updateError, isError, error]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = form;
    try {
      await updateBlog({ blogId, data: { title, description } });
      toast.success("Blog updated successfully");
      refetch();
      blogrefetch();
      navigate("/my-blogs");
    } catch (error) {
      toast.error("Error updating blog");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="w-full flex items-center justify-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-screen-md flex items-center justify-center flex-col gap-4 border border-slate-300 py-10 px-10 rounded-lg"
        >
          <h1 className="text-3xl font-semibold text-slate-700">Edit Blog</h1>

          <div className="border border-slate-300 rounded-md w-full">
            <div className="flex items-center justify-center bg-white p-2 rounded-md w-full">
              <input
                onChange={handleInputChange}
                required
                name="title"
                type="text"
                placeholder="Enter blog title"
                className="outline-none border-none w-full"
                value={form.title}
              />
            </div>
          </div>
          <div className="border border-slate-300 rounded-md w-full">
            <div className="flex items-center justify-center bg-white p-2 rounded-md w-full">
              <textarea
                onChange={handleInputChange}
                required
                rows={8}
                name="description"
                placeholder="Enter blog description"
                className="outline-none border-none resize-none w-full"
                value={form.description}
              />
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full tracking-wide font-semibold bg-black text-white py-2 px-2 rounded-md hover:cursor-pointer hover:opacity-80 transition-all duration-200"
          >
            {updateLoading ? "Updating..." : "Update Blog"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditBlog;

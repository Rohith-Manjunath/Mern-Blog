import { ToastContainer, toast } from "react-toastify";
import Loader from "../components/layouts/Loader";
import { useEffect } from "react";
import { useGetBlogByIdQuery } from "../Redux/BlogAuth";
import { useLocation } from "react-router-dom";

const SingleBlogDetails = () => {
  const blogId = useLocation().pathname.split("/")[2];
  const { data, isLoading, isError, error } = useGetBlogByIdQuery(blogId);

  useEffect(() => {
    if (isError) {
      toast.error(error.data.err);
    }
  }, [isError, error]);

  if (isLoading) {
    return <Loader />;
  }

  const blog = data?.blog || null;

  return (
    <>
      <div className="w-[80%] mx-auto p-6 flex items-center justify-center  flex-col gap-4 rounded-md border border-slate-400 my-6">
        <img src={blog.image.url} className="rounded-md" alt="" />
        <p>{blog.description}</p>
      </div>

      <ToastContainer />
    </>
  );
};

export default SingleBlogDetails;

import { ToastContainer, toast } from "react-toastify";
import { useGetBlogsQuery } from "../Redux/BlogAuth";
import { useEffect } from "react";
import Loader from "../components/layouts/Loader";
import BlogCard from "../components/cards/BlogCard";

const Blogs = () => {
  const { data, isLoading, isError, error } = useGetBlogsQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error.data.err);
    }
  }, [isError, error]);

  if (isLoading) {
    return <Loader />;
  }

  const blogs = data?.blogs || [];

  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-4 p-6 gap-4">
        {blogs.map((item) => (
          <BlogCard
            key={item._id}
            image={item.image}
            title={item.title}
            description={item.description}
            id={item._id}
            user={item.user}
          />
        ))}
      </div>
    </>
  );
};

export default Blogs;

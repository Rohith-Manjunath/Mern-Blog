import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/layouts/Loader";
import { useEffect } from "react";
import { clearError, clearSuccess, getAllblogs } from "../Redux/BlogSlice";
import BlogCard from "../components/cards/BlogCard";

const Blogs = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { blogs, error, success, loading } = useSelector(
    (state) => state.blogs
  );

  useEffect(() => {
    dispatch(getAllblogs());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (success) {
      dispatch(clearSuccess());
    }
  }, [error, alert, success, dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-[90%] mx-auto p-4 grid grid-cols-4 gap-6">
      {blogs.map((blog) => {
        return (
          <BlogCard
            title={blog.title}
            description={blog.description}
            image={blog.image}
            key={blog._id}
            user={blog.user}
            id={blog._id}
          />
        );
      })}
    </div>
  );
};

export default Blogs;

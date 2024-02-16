import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { clearError, clearSuccess, getSingleBlog } from "../Redux/BlogSlice";
import { useAlert } from "react-alert";
import Loader from "../components/layouts/Loader";

const SingleBlogDetails = () => {
  const path = useLocation().pathname;
  const id = path.split("/")[3];
  const dispatch = useDispatch();
  const { error, blog, loading, success } = useSelector((state) => state.blogs);
  const alert = useAlert();
  const { image, description } = blog;

  useEffect(() => {
    dispatch(getSingleBlog(id));

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (success) {
      clearSuccess();
    }
  }, [alert, dispatch, id, success, error]);

  if (loading) {
    return <Loader />;
  }

  console.log(blog);

  return (
    <div className="w-[80%] mx-auto p-10 border border-slate-300 rounded-md mt-10">
      <div className=" flex items-center justify-center flex-col gap-5">
        <img src={image.url} alt="" className="w-[300px]" />
        <p>{description}</p>
      </div>
    </div>
  );
};

export default SingleBlogDetails;

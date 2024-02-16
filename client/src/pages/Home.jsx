import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loadUser } from "../Redux/UserSlice";
import Loader from "../components/layouts/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const alert = useAlert();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch, alert]);

  if (loading) {
    return <Loader />;
  }

  return <div>Home</div>;
};

export default Home;

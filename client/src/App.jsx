import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProtectedRoute from "./components/layouts/ProtectedRoute";
import UserProtected from "./components/layouts/UserProtected";
import Register from "./pages/Register";
import Blogs from "./pages/Blogs";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import MyBlogs from "./pages/MyBlogs";
import SingleBlogDetails from "./pages/singleBlogDetails";

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<Admin />}></Route>
          </Route>
          <Route element={<UserProtected />}>
            <Route path="/blogs" element={<Blogs />}></Route>
            <Route path="/my-blogs" element={<MyBlogs />}></Route>
            <Route path="/blog/:blogId" element={<SingleBlogDetails />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

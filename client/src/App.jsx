import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { ReactNavbar } from "overlay-navbar";
import Navbar from "./components/layouts/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/layouts/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import UserProtected from "./components/layouts/UserProtected";
import Blogs from "./pages/Blogs";

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
            <Route path="/admin" element={<AdminDashboard />}></Route>
          </Route>
          <Route element={<UserProtected />}>
            <Route path="/blogs" element={<Blogs />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

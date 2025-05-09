import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../utils/Constants";
import { UserContext } from "../../context/UserContext.jsx";
import Notification from "../../components/notification";
import modlogo from "../../assets/images/vms-logo.png";
import logINImg from "../../assets/images/loginimg.png";
import BGImg from "../../assets/images/background.jpg";
import footerwave from "../../assets/images/footer-wave.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Loading from "../../components/loading";
import SignUp from "./SignUp";
import { postAPI } from "../../utils/api"; // Import the postAPI function

const Login = () => {
  let navigate = useNavigate();

  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginFromEmployee = () => {
    setShowLogin(!showLogin);
  };
  const handleSignup = () => {
    setIsSignUp(!isSignUp);
    // navigate('/signup')
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!showLogin) {
      try {
        const data = {
          email: username, // or 'username' if your API expects it
          password: password,
        };

        console.log("formdata", data);

        const json = await postAPI("http://localhost:5000/api/auth/login", data);

        if (json.user.role === "admin") {
          Notification.showSuccessMessage("Welcome", "Logged in Successfully");
        
          localStorage.setItem("user_id", json.id || '1');
          localStorage.setItem("user_name", json.user.name);
          localStorage.setItem("user_type", 'Admin');
          localStorage.setItem("image", json.image || '/jjhvgvh');
          localStorage.setItem("token", json.token);
          localStorage.setItem("refresh_token", json.token);
          localStorage.setItem("loginUserInfo", JSON.stringify(json));
        
          setUser(json);
          setUsername("");
          setPassword("");
          navigate("/");
          return;
        } else {
          Notification.showErrorMessage(
            "Access Denied",
            "Login allowed only for admins"
          );
        }
        
      } catch (err) {
        console.error("Error during login:", err.message);
        Notification.showErrorMessage("Login Failed", "Invalid credentials or server error.");
      } finally {
        setIsLoading(false);
      }
    } else {
      // If login is with fixed values
      if (username === "admin@vms.com" && password === "123456") {
        const fakeUser = {
          id: 1,
          username: "admin@vms.com",
          user_type: "admin",
          image: "", // default avatar
          token: {
            access: "fake_access_token_admin",
            refresh: "fake_refresh_token_admin",
          },
        };

        Notification.showSuccessMessage(
          "Welcome",
          "Logged in Successfully (Admin)"
        );

        localStorage.setItem("user_id", fakeUser.id);
        localStorage.setItem("user_name", fakeUser.username);
        localStorage.setItem("user_type", fakeUser.user_type);
        localStorage.setItem("image", fakeUser.image);
        localStorage.setItem("token", fakeUser.token.access);
        localStorage.setItem("refresh_token", fakeUser.token.refresh);
        localStorage.setItem("userInfo", JSON.stringify(fakeUser));

        setUser(fakeUser);
        setUsername("");
        setPassword("");
        setIsLoading(false);
        navigate("/");
        return;
      } else if (username === "employee@vms.com" && password === "123456") {
        const fakeUser = {
          id: 2,
          username: "employee@vms.com",
          user_type: "Guard",
          image: "", // default avatar
          token: {
            access: "fake_access_token_employee",
            refresh: "fake_refresh_token_employee",
          },
        };

        Notification.showSuccessMessage(
          "Welcome",
          "Logged in Successfully (Employee)"
        );

        localStorage.setItem("user_id", fakeUser.id);
        localStorage.setItem("user_name", fakeUser.username);
        localStorage.setItem("user_type", fakeUser.user_type);
        localStorage.setItem("image", fakeUser.image);
        localStorage.setItem("token", fakeUser.token.access);
        localStorage.setItem("refresh_token", fakeUser.token.refresh);
        localStorage.setItem("userInfo", JSON.stringify(fakeUser));

        setUser(fakeUser);
        setUsername("");
        setPassword("");
        setIsLoading(false);
        navigate("/");
        return;
      } else if (username === "Receptionist@vms.com" && password === "123456") {
        const fakeUser = {
          id: 2,
          username: "Receptionist@vms.com",
          user_type: "Receptionist",
          image: "", // default avatar
          token: {
            access: "fake_access_token_Receptionist",
            refresh: "fake_refresh_token_Receptionist",
          },
        };

        Notification.showSuccessMessage(
          "Welcome",
          "Logged in Successfully"
        );

        localStorage.setItem("user_id", fakeUser.id);
        localStorage.setItem("user_name", fakeUser.username);
        localStorage.setItem("user_type", fakeUser.user_type);
        localStorage.setItem("image", fakeUser.image);
        localStorage.setItem("token", fakeUser.token.access);
        localStorage.setItem("refresh_token", fakeUser.token.refresh);
        localStorage.setItem("userInfo", JSON.stringify(fakeUser));

        setUser(fakeUser);
        setUsername("");
        setPassword("");
        setIsLoading(false);
        navigate("/");
        return;
      } else {
        Notification.showErrorMessage(
          "Login Failed",
          "Invalid username or password"
        );
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  const handleDemoLogin = (role) => {
    handleLoginFromEmployee();
    switch (role) {
      case "admin":
        setUsername("admin@vms.com");
        setPassword("123456");
        break;
      case "Guard":
        setUsername("employee@vms.com");
        setPassword("123456");
        break;
      case "Receptionist":
        setUsername("Receptionist@vms.com");
        setPassword("123456");
        break;
      default:
        break;
    }
  };


  return (
    <div
      className="min-h-screen flex items-center justify-center  relative overflow-hidden"
      style={{
        backgroundImage: `url(${BGImg})`, // ✅ Correct way
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left: Login Form */}

        {isSignUp ? (
          <SignUp handleBackToLogin={handleSignup} />
        ) : (
          <div className="w-full md:w-1/2 p-10">
            <h2 className="text-3xl font-bold text-[#003087] mb-6">Login</h2>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                E-mail<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <label className="flex items-center text-sm">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <a
                href="#"
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                Reset Password?
              </a>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#003087] hover:bg-[#00216b] text-white font-bold py-3 rounded-xl shadow-md transition-all duration-200"
            >
              Login
            </button>

            <div className="mt-6 text-center font-medium text-gray-600">
               Click Here For{" "}
              <span
                onClick={handleSignup}
                className="text-blue-600 font-medium hover:underline cursor-pointer"
              >
                Create Account
              </span>
            </div>


           
          </div>
        )}

        {/* Right: Image */}
        <div className="w-full md:w-1/2 hidden md:block">
          <img
            src={logINImg}
            alt="Login Visual"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

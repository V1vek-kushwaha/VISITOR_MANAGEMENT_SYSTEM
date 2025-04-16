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

const Login = () => {
  let navigate = useNavigate();

  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(`${url}/accounts/login-user/`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         username: username,
  //         password: password,
  //       }),
  //     });
  //     const json = await response.json();

  //     if (response.ok) {
  //       Notification.showSuccessMessage("Welcome", "Logged in Successfully");

  //       localStorage.setItem("user_id", json.id);
  //       localStorage.setItem("user_name", json.username);
  //       localStorage.setItem("user_type", json.user_type);
  //       localStorage.setItem("image", json.image);
  //       localStorage.setItem("token", json.token.access);
  //       localStorage.setItem("refresh_token", json.token.refresh);
  //       localStorage.setItem("userInfo", JSON.stringify(json));

  //       setUser(json);
  //       setUsername("");
  //       setPassword("");
  //       navigate("/");
  //     } else {
  //       setIsLoading(false);
  //       Notification.showErrorMessage("Login Failed", json.error || "Invalid credentials");
  //     }
  //   } catch (err) {
  //     setIsLoading(false);
  //     Notification.showErrorMessage("Error", "Server error!");
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

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
    } else {
      Notification.showErrorMessage(
        "Login Failed",
        "Invalid username or password"
      );
      setIsLoading(false);
    }

    // Default: actual API login for real users
    try {
      const response = await fetch(`${url}/accounts/login-user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const json = await response.json();

      if (response.ok) {
        Notification.showSuccessMessage("Welcome", "Logged in Successfully");

        localStorage.setItem("user_id", json.id);
        localStorage.setItem("user_name", json.username);
        localStorage.setItem("user_type", json.user_type);
        localStorage.setItem("image", json.image);
        localStorage.setItem("token", json.token.access);
        localStorage.setItem("refresh_token", json.token.refresh);
        localStorage.setItem("userInfo", JSON.stringify(json));

        setUser(json);
        setUsername("");
        setPassword("");
        navigate("/");
      } else {
        Notification.showErrorMessage(
          "Login Failed",
          json.error || "Invalid credentials"
        );
      }
    } catch (err) {
      Notification.showErrorMessage("Error", "Server error!");
    } finally {
      setIsLoading(false);
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
            For Demo Login, Click Below
          </div>

          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => handleDemoLogin("admin")}
              className="px-4 py-2 bg-blue-400 text-white rounded-full font-semibold text-sm hover:bg-blue-500"
            >
              Admin
            </button>
            <button
              onClick={() => handleDemoLogin("Guard")}
              className="px-4 py-2 bg-orange-400 text-white rounded-full font-semibold text-sm hover:bg-orange-500"
            >
              Employee
            </button>
            <button
              onClick={() => handleDemoLogin("Receptionist")}
              className="px-4 py-2 bg-purple-400 text-white rounded-full font-semibold text-sm hover:bg-purple-500"
            >
              Reception
            </button>
          </div>
        </div>

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

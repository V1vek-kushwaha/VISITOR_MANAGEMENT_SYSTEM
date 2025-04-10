import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../utils/Constants";
import { UserContext } from "../../context/UserContext.jsx";
import Notification from "../../components/notification";
import modlogo from "../../assets/images/vms-logo.png";
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
    if (username === "admin" && password === "123456") {
      const fakeUser = {
        id: 1,
        username: "admin",
        user_type: "admin",
        image: "", // You can provide a default avatar URL here
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

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0070F0] via-[#00B5F5] to-[#8CF0E4] overflow-hidden">
      {/* Black overlay for better contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-10 z-0"></div>

      <form
        className="relative z-10 w-full max-w-md rounded-2xl px-8 py-10 text-white border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center mb-6">
          <img src={modlogo} alt="VMS Logo" className="h-20 drop-shadow-lg" />
        </div>

        <div className="text-center  font-bold tracking-wide">
          Version 0.0.21
        </div>
        <div className="text-center text-lg font-medium text-white/80 mb-8"></div>

        <div className="mb-5">
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-[#00D6ED]"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-6 relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 text-white pr-10 focus:outline-none focus:ring-2 focus:ring-[#00D6ED]"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={handleTogglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/80"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#00B5F5] hover:bg-[#00A0E0] transition-colors duration-200 py-3 rounded-lg font-semibold tracking-wide shadow-md"
        >
          Login
        </button>
      </form>

      {/* Bottom wave remains on top */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <img src={footerwave} alt="Wave" className="w-full" />
      </div>
    </div>
  );
};

export default Login;

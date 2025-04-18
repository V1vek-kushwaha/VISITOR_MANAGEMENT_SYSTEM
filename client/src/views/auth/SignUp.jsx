import { useState } from "react";
import { postAPI } from "../../utils/api"; // Import the postAPI function
import Notification from "../../components/notification";
import BGImg from "../../assets/images/background.jpg";
import { useNavigate } from "react-router-dom";
import logINImg from "../../assets/images/loginimg.png";

const Signup = ({handleBackToLogin}) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    mobile_number: "",
    profile_photo_url: "https://api.example.com/signup",
  });
  let navigate = useNavigate();


  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear the specific error if the user starts modifying the input
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.full_name || formData.full_name.length < 3) {
      newErrors.full_name = "Name is required and must be at least 3 characters.";
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.mobile_number || !/^\d{10}$/.test(formData.mobile_number)) {
      newErrors.mobile_number = "Mobile number must be 10 digits";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Call the API to submit the form data
      const response = await postAPI("http://localhost:5000/api/auth/signup", formData);
      console.log("Sign up successful:", response);
      if (response) {
        Notification.showSuccessMessage(
          response.message
        );
      } else {
        Notification.showErrorMessage(response.message);
      }
      // After successful sign-up, call handleBackToLogin to go back to the login page
      handleBackToLogin();
    } catch (err) {
      console.error("Error during sign up:", err.message);
      Notification.showErrorMessage('Error during signup')
      // You can show an error message to the user here
    }
  };
  // const handleBackToLogin = () => {
  //   // setIsSignUp(!isSignUp);
  //   navigate('/login')
  // };

  return (
  
    <>
    {/* <div
      className="min-h-screen flex items-center justify-center  relative overflow-hidden"
      style={{
        backgroundImage: `url(${BGImg})`, // ✅ Correct way
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    > */}
      {/* <div className="relative z-10 w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"> */}
        {/* Left: Login Form */}

       


        {/* Right: Image */}
        {/* <div className="w-full md:w-1/2 hidden md:block">
          <img
            src={logINImg}
            alt="Login Visual"
            className="h-full w-full object-cover"
          />
        </div> */}
      {/* </div> */}
    {/* </div> */}
     <div className="w-full md:w-1/2 p-10 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-[#003087] mb-6">Create Account</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${errors.full_name ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholder="Enter your full name"
              />
              {errors.full_name && (
                <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Mobile Number</label>
              <input
                type="tel"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${errors.mobile_number ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholder="Enter your mobile number"
              />
              {errors.mobile_number && (
                <p className="text-red-500 text-sm mt-1">{errors.mobile_number}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#003087] hover:bg-[#00216b] text-white font-bold py-3 rounded-xl shadow-md transition-all duration-200"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              onClick={handleBackToLogin}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        </div>
    </>
  );
};

export default Signup;

import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext.jsx";
import Notification from "../../components/notification";
import essilogo from "../../assets/images/essi-logo.png";
import Profile from "../../views/auth/Profile.jsx";
import { url } from "../../utils/Constants";

const Topbar = () => {
  let history = useNavigate();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const { setIslogin, setUser, user, setDatas } = useContext(UserContext);
  const [language, setLanguage] = useState("English");
  const [langDropdown, setLangDropdown] = useState(false);
  
  // const handleLogout = async () => {
  //   try {
  //     const response = await fetch(`${url}/accounts/logout-user/`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       body: JSON.stringify({
  //         refresh: localStorage.getItem("refresh_token"),
  //       }),
  //     });
  //     if (response.ok) {
  //       localStorage.clear();
  //       setUser();
  //       history("/login");
  //       Notification.showSuccessMessage(
  //         "Logout Successfully!",
  //         "You have been logged out successfully."
  //       );
  //     }
  //   } catch (err) {
  //     Notification.showErrorMessage("Error", "Server error!");
  //   }
  // };
  const handleLogout = () => {
    localStorage.clear();
    setUser();
    setIslogin(false); // optionally set login status false

    history("/login");
    Notification.showSuccessMessage(
      "Logout Successfully!",
      "You have been logged out successfully."
    );
  };

  let username = localStorage.getItem("user_name");
  let userimage = localStorage.getItem("image");

  useEffect(() => {
    username = localStorage.getItem("user_name");
    userimage = localStorage.getItem("image");
  });

  return (
    <>
      <div
        className="flex justify-between items-center  p-4 shadow-lg mt-2 mx-2 rounded-2xl backdrop-blur-xl bg-gradient-to-r from-white/30 via-white/20 to-[#a1c4fd]/40
"
      >
        {/* <img src={essilogo} alt="MOD Logo" className="h-12" />  */}
        {/* <div class="h-full flex items-center text-blue-900 font-bold text-xl">
          VISITOR MANAGEMENT SYSTEM
        </div> */}

{localStorage.getItem("token") && (
  <div className="flex pl-80 space-x-2">
    {/* Checkout Button */}
    <button
      className="flex items-center bg-[#edf0f9] text-blue-900 font-medium py-2 px-4 rounded-2xl shadow-sm text-sm hover:opacity-90"
      onClick={() => alert('Checkout clicked!')}
    >
      <span className="mr-1">↩</span> Checkout
    </button>

    {/* Clock In Button */}
    <button
      className="flex items-center bg-[#edf0f9] text-blue-900 font-medium py-2 px-4 rounded-2xl shadow-sm text-sm hover:opacity-90"
      onClick={() => alert('Clock In clicked!')}
    >
      <span className="mr-1">＋</span> Clock In
    </button>

    {/* Language Selector */}
    <div className="relative">
  <div
    onClick={() => setLangDropdown(!langDropdown)}
    className="flex items-center bg-[#edf0f9] text-blue-900 font-medium py-2 px-4 rounded-2xl shadow-sm text-sm cursor-pointer hover:opacity-90"
  >
    <span className="mr-1">🇬🇧</span> {language}
  </div>

  {langDropdown && (
    <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-50">
      <div
        onClick={() => { setLanguage("English"); setLangDropdown(false); }}
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
      >
        🇬🇧 English
      </div>
      <div
        onClick={() => { setLanguage("Arabic"); setLangDropdown(false); }}
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
      >
        🇸🇦 Arabic
      </div>
    </div>
  )}
</div>

    {/* Profile Section */}
    <div
      className="flex items-center space-x-2 bg-blue-900 rounded-full p-1 transform scale-90 shadow-md min-w-[130px]"
      onClick={() => setProfileModalOpen(true)}
    >
      <div className="w-8 h-8 border-2 border-gray-300 rounded-full overflow-hidden bg-blue-900 flex justify-center items-center">
        {userimage != "null" ? (
          <img
            src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="image"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white">
            {username ? username.charAt(0).toUpperCase() : "N"}
          </span>
        )}
      </div>
      <span className="text-white p-1">{username}</span>
    </div>

    <button
      className="bg-blue-900 hover:blue-900 text-white py-2 px-4 rounded-3xl shadow-md flex items-center text-sm"
      onClick={() => handleLogout()}
    >
      Logout
    </button>
  </div>
)}

      </div>

      <Profile
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </>
  );
};
export default Topbar;

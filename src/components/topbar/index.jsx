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
        {/* <img src={essilogo} alt="MOD Logo" className="h-12" /> */}
        <div class="h-full flex items-center text-blue-900 font-bold text-xl">
          VISITOR MANAGEMENT SYSTEM
        </div>

        {localStorage.getItem("token") && (
          <div className="flex items-center space-x-2">
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

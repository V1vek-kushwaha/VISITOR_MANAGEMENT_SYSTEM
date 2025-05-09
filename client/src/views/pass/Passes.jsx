import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../utils/Constants.jsx";
import Notification from "../../components/notification/index.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import ViewPass from "./ViewPass";
import axios from "axios";

const Passes = () => {
  const [passesData, setPassesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSelectedPass, setCurrentSelectedPass] = useState(null);
  const [showViewPass, setShowViewPass] = useState(false);

  let navigate = useNavigate();

  

  
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const storedPasses = localStorage.getItem("visitorPasses");
      const parsedPasses = JSON.parse(storedPasses);
      
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/pass/visitor_pass/getAllPass`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPassesData(response.data.data);



      if (Array.isArray(parsedPasses)) {
        // setPassesData(parsedPasses);
        // console.log("allPass", response.data.data , passesData);
      } else {
        setPassesData([]); // Fallback to empty array
        Notification.showErrorMessage(
          "No Data",
          "Invalid data format in local storage."
        );
      }
    } catch (err) {
      console.error("LocalStorage Parse Error:", err);
      setPassesData([]);
      Notification.showErrorMessage(
        "Error",
        "Something went wrong while reading local storage."
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    const dummyData = [
      {
        visitor: {
          first_name: "Akash",
          last_name: "Tiwari",
          image: "", // base64 string or leave empty to show initials
        },
        visiting_purpose: "Meeting",
        whom_to_visit: "Mr. Verma",
        visiting_department: "HR",
        created_on: new Date().toISOString(),
        valid_until: new Date(Date.now() + 86400000).toISOString(), // +1 day
      },
      {
        visitor: {
          first_name: "Sneha",
          last_name: "Roy",
          image: "",
        },
        visiting_purpose: "Interview",
        whom_to_visit: "Ms. Kapoor",
        visiting_department: "IT",
        created_on: new Date().toISOString(),
        valid_until: new Date(Date.now() + 2 * 86400000).toISOString(),
      },
    ];
  
    // Only set dummy data if it hasn't already been set
    if (!localStorage.getItem("visitorPasses")) {
      localStorage.setItem("visitorPasses", JSON.stringify(dummyData));
    }
  
    fetchData();
  }, []);

  const handleRowClick = (pass) => {
    setCurrentSelectedPass(pass);
    setShowViewPass(true);
  };

  
  return (
    <div style={{ marginBottom: "55px" }}>
      <div className="flex items-center justify-between m-6">
        <div>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border border-blue-900 appearance-none rounded-3xl focus:outline-none focus:ring-2 "
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
      {isLoading ? (
        <Box
          style={{
            height: "50vh",
            minHeight: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div className="my-6 bg-white rounded shadow-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 rounded-md border-<2> text-slate-950">
                <th className="px-6 py-4 text-xs font-bold uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">
                  Visitor Image
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">
                  Visitor Name
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">
                  Purpose
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">
                  Whom To Visit
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">
                  Visiting Department
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">
                  Created On
                </th>
                <th className="px-6 py-4 text-sx font-bold uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">
                  Valid Until
                </th>
              </tr>
            </thead>
            <tbody>
              {passesData.map((pass, index) => (
                <tr
                  key={index}
                  className="cursor-pointer hover:bg-grey-lighter"
                  onClick={() => handleRowClick(pass)}
                >
                  <td className="px-1 py-1 border-b border-grey-light">
                    <div className="flex justify-center">
                      <div className="inline-block w-16 h-16 overflow-hidden bg-[#0096a4] border-2 border-gray-300 rounded-full">
                        {pass?.visitor?.image ? (
                          <img
                            src={`data:image/jpeg;base64,${pass?.visitor?.image}`}
                            alt="User"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full text-white bg-[#0096a4]">
                            {pass?.visitor?.first_name
                              ? pass?.visitor?.first_name.charAt(0).toUpperCase()
                              : "N"}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-grey-light">
                    {pass?.visitor?.first_name} {pass?.visitor?.last_name}
                  </td>
                  <td className="px-6 py-4 border-b border-grey-light">
                    {pass?.visiting_purpose || pass?.visit_purpose}
                  </td>
                  <td className="px-6 py-4 border-b border-grey-light">
                    {pass?.whom_to_visit}
                  </td>
                  <td className="px-6 py-4 border-b border-grey-light">
                    {pass?.visiting_department || pass?.visit_department}
                  </td>
                  <td className="px-6 py-4 border-b border-grey-light">
                    {new Date(pass?.created_on).toLocaleString("en-IN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </td>
                  <td className="px-6 py-4 border-b border-grey-light">
                    {new Date(pass?.valid_until).toLocaleString("en-IN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {currentSelectedPass && (
        <ViewPass
          passData={currentSelectedPass}
          open={showViewPass}
          onClose={() => setShowViewPass(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default Passes;

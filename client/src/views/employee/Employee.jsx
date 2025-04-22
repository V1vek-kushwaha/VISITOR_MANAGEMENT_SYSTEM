import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const Index = () => {
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const dummyData = [
    { name: "Amit Sharma", email: "amit.sharma@example.com", phone: "+91 898895685", joiningDate: "2024-01-15", status: "Active" },
    { name: "Priya Kumar", email: "priya.kumar@example.com", phone: "+91 989667977", joiningDate: "2024-02-01", status: "Inactive" },
    { name: "John Doe", email: "john.doe@example.com", phone: "+91 6578790786", joiningDate: "2024-03-12", status: "Active" },
    { name: "Neha Verma", email: "neha.verma@example.com", phone: "91 898994656", joiningDate: "2024-04-18", status: "Inactive" },

  ];

  const toggleMenu = (index) => {
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };

  const filteredData = dummyData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  return (
    <div className="p-4 md:p-8 lg:p-10 mb-14 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-gray-800">Employee Details</h3>
        <button className="flex items-center px-5 py-2 text-white bg-blue-900 rounded-full shadow-md  transition duration-300 ease-in-out">
          <AddIcon className="w-5 mr-2 h-7" />
          ADD NEW
        </button>
      </div>

      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="my-6 bg-gray-400 rounded shadow-md ">
        <table className=" my-6 bg-white rounded shadow-md">
          <thead className="w-full text-left border-collapse">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Phone Number</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Joining Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.length > 0 ? (
              filteredData.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50 relative">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{user.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{user.joiningDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button onClick={() => toggleMenu(index)} className="text-gray-700 hover:text-gray-900">
                      <MoreVertIcon />
                    </button>
                    {menuOpenIndex === index && (
                      <div className="absolute right-12 bg-white shadow-xl rounded-md z-10 mt-2 w-48 p-2">
                        <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                          View
                        </button>

                        <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                          Delete
                        </button>

                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center px-6 py-4 text-gray-500">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;
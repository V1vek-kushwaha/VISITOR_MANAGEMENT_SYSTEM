import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Alert from "../../components/alert/index.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Pagination from "../../components/pagination/index.jsx";
import axios from "axios";
import Notification from "../../components/notification/index.jsx";

const Visitors = ({
  totalVisitors,
  onActionClick,
  searchParams,
  setSearchParams,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentSelectedVisitor, setCurrentSelectedVisitor] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [visitors, setVisitors] = useState();
  // const [visitor, setVisitor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/visitor/visitors-all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setVisitors(response.data.data);
        console.log("API Response:", response.data.data);
      } catch (error) {
        console.error("Error fetching visitor:", error);
      } finally {
        setIsLoading(false);

      }
    };

    fetchVisitors();
  }, []);

  // console.log("hiii", visitors)

  const handleClick = (event, visitors) => {
    setAnchorEl(event.currentTarget);
    setCurrentSelectedVisitor(visitors);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (visitors) => {
    setCurrentSelectedVisitor(visitors);
    setShowDeleteAlert(true);
    handleClose();
  };

  const confirmDelete = async () => {
    console.log("Deleting...", currentSelectedVisitor);
    try {
      const token = localStorage.getItem("token");
  
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/visitor/visitors-delete/${currentSelectedVisitor.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("API Response:", response);
      Notification.showSuccessMessage(
        response.message,
        'Visitor Deleted successfully!'
      );
      setShowDeleteAlert(false);
    } catch (error) {
      console.error("Error deleting visitor:", error);
    }
  };
  

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    const newName = `${name}__icontains`;
    setSearchParams({ ...searchParams, [newName]: value });
    setCurrentPage(1);
  };

  const handleLimitChange = (event) => {
    setSearchParams({ ...searchParams, limit: event.target.value, offset: 0 });
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (offset) => {
    setSearchParams({ ...searchParams, offset });
  };

  useEffect(() => {
    handlePageChange((currentPage - 1) * itemsPerPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalVisitors / itemsPerPage);

  useEffect(() => {
    console.log("Visitors from API:", visitors);
  }, [visitors]);




  return (
    <div style={{ marginBottom: "55px" }}>
      <div className="flex items-center justify-between m-6">
        <div className="flex items-center space-x-2">
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg appearance-none border-customGreen focus:outline-none focus:ring-2 focus:ring-green-700"
            type="text"
            name="first_name"
            value={searchParams.first_name}
            onChange={handleSearchChange}
            placeholder="Search by name"
          />
          {/* <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border appearance-none border-customGreen rounded-3xl focus:outline-none focus:ring-2 focus:ring-green-700"
            type="text"
            name="last_name"
            value={searchParams.last_name}
            onChange={handleSearchChange}
            placeholder="Search by last name"
          /> */}
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg appearance-none border-customGreen focus:outline-none focus:ring-2 focus:ring-green-700"
            type="text"
            name="phone"
            value={searchParams.phone}
            onChange={handleSearchChange}
            placeholder="Search by phone number"
          />
          {/* <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border appearance-none border-customGreen rounded-3xl focus:outline-none focus:ring-2 focus:ring-green-700"
            type="text"
            name="gov_id_no"
            value={searchParams.gov_id_no}
            onChange={handleSearchChange}
            placeholder="Search by govt ID number"
          /> */}
          <select
            value={searchParams.limit}
            onChange={handleLimitChange}
            className="px-3 py-2 text-gray-700 bg-white border rounded-lg border-customGreen focus:outline-none"
          >
            {[5, 10, 20, 30, 50].map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
        </div>
        <div className="flex space-x-3">
          <button
            className="flex items-center px-4 py-1 text-white bg-[#0096a4]  rounded-3xl"
            onClick={() => {
              onActionClick("addNewVisitor");
              handleClose();
            }}
          >
            <AddIcon className="w-5 mr-2 h-7" />
            ADD NEW
          </button>
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
      ) : visitors?.length > 0 ? (
        <div className="p-2 bg-white rounded shadow-md overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-slate-950">
                <th className="px-6 py-4 text-xs font-bold uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">Image</th>
                <th className="px-6 py-4 text-xs font-bold uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">Type</th>
                <th className="px-6 py-4 text-xs font-bold uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">Phone</th>
                <th className="px-6 py-4 text-xs font-bold uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">Gov ID</th>
                <th className="px-6 py-4 text-xs font-bold uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">Gov ID No</th>
                <th className="px-6 py-4 text-xs font-bold uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">Email</th>
                <th className="px-6 py-4 text-xs font-bold uppercase border-b bg-grey-lightest text-grey-dark border-grey-light">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visitors?.map((visitors) => (
                <tr key={visitors.id} className="hover:bg-gray-50">
                  <td className="px-2 py-2 border-b">
                    <div className="flex justify-center">
                      <div className="inline-block w-16 h-16 overflow-hidden border-2 border-gray-300 rounded-full bg-[#0096a4]">
                        {visitors.image ? (
                          <img
                            src={`data:image/jpeg;base64,${visitors.photo_url}`}
                            alt="User"
                            className="object-cover w-40 h-40 rounded-full"
                          />

                        ) : (
                          <div className="flex items-center justify-center w-full h-full text-white bg-[#0096a4]">
                            {visitors.first_name ? visitors.first_name.charAt(0).toUpperCase() : "N"}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b">{visitors.full_name}</td>
                  <td className="px-6 py-4 border-b">{visitors.visitor_type}</td>
                  <td className="px-6 py-4 border-b">{visitors.mobile_number}</td>
                  <td className="px-6 py-4 border-b">{visitors.government_id_type?.replace("_", " ")}</td>
                  <td className="px-6 py-4 border-b">{visitors.government_id_number}</td>
                  <td className="px-6 py-4 border-b">{visitors.email}</td>
                  <td className="px-6 py-4 border-b">
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={(event) => handleClick(event, visitors)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={() => {
                          onActionClick("view", currentSelectedVisitor);
                          handleClose();
                        }}
                      >
                        <ListItemIcon>
                          <VisibilityIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="View" />
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          onActionClick("update", currentSelectedVisitor);
                          handleClose();
                        }}
                      >
                        <ListItemIcon>
                          <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Update" />
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleDelete(currentSelectedVisitor);
                        }}
                      >
                        <ListItemIcon>
                          <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Delete" />
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          onActionClick("pass", currentSelectedVisitor);
                          handleClose();
                        }}
                      >
                        <ListItemIcon>
                          <CreditCardIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Generate Pass" />
                      </MenuItem>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={setCurrentPage}
            />
          </div>
        </div>

      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            textAlign: "center",
          }}
        >
          <p>No Visitor found.</p>
        </Box>
      )}
      <Alert
        open={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        title="Confirm Delete"
        message="Are you sure you want to delete this Visitor?"
        buttonText="Delete"
        buttonColor="red"
        onButtonClick={confirmDelete}
      />
    </div>
  );
};

export default Visitors; 
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
import { fetchVisitors} from "../../utils/visitorService.js";

const Visitors = ({
  // visitors,
  // totalVisitors,
  // isLoading,
  onActionClick,
  searchParams,
  setSearchParams,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentSelectedVisitor, setCurrentSelectedVisitor] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [visitors, setVisitors] = useState([]);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (event, visitor) => {
    setAnchorEl(event.currentTarget);
    setCurrentSelectedVisitor(visitor);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (visitor) => {
    setCurrentSelectedVisitor(visitor);
    setShowDeleteAlert(true);
    handleClose();
  };

  const confirmDelete = () => {
    console.log("Deleting...");
    console.log(currentSelectedVisitor);
    setShowDeleteAlert(false);
    // Perform delete action
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

  useEffect(() => {
    const loadVisitors = async () => {
      setIsLoading(true);
      const params = { ...searchParams, limit: itemsPerPage, offset: (currentPage - 1) * itemsPerPage };
      const data = await fetchVisitors(params);
      setVisitors(data.results);
      setTotalVisitors(data.count);
      setIsLoading(false);
    };

    loadVisitors();
  }, [searchParams, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalVisitors / itemsPerPage);

  

  const handleAddNewVisitor = async () => {
    const newVisitor = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890"
    };

  
  };

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
            className="flex items-center px-4 py-1 text-white bg-blue-900 rounded-3xl"
            onClick={handleAddNewVisitor}
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
              {visitors?.map((visitor) => (
                <tr key={visitor.id} className="hover:bg-gray-50">
                  <td className="px-2 py-2 border-b">
                    <div className="flex justify-center">
                      <div className="inline-block w-16 h-16 overflow-hidden border-2 border-gray-300 rounded-full bg-blue-900">
                        {visitor.image ? (
                          <img
                            src={`data:image/jpeg;base64,${visitor.image}`}
                            alt="User"
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full text-white bg-blue-900">
                            {visitor.first_name ? visitor.first_name.charAt(0).toUpperCase() : "N"}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b">{visitor.first_name} {visitor.last_name}</td>
                  <td className="px-6 py-4 border-b">{visitor.visitor_type}</td>
                  <td className="px-6 py-4 border-b">{visitor.phone}</td>
                  <td className="px-6 py-4 border-b">{visitor.gov_id_type.replace("_", " ")}</td>
                  <td className="px-6 py-4 border-b">{visitor.gov_id_no}</td>
                  <td className="px-6 py-4 border-b">{visitor.email}</td>
                  <td className="px-6 py-4 border-b">
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={(event) => handleClick(event, visitor)}
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

import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import AddIcon from "@mui/icons-material/Add";
import Alert from "../../components/alert/index.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Pagination from "../../components/pagination/index.jsx";

const Visitors = ({
  visitors,
  totalVisitors,
  isLoading,
  onActionClick,
  searchParams,
  setSearchParams,
  // handleDelete,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentSelectedVisitor, setCurrentSelectedVisitor] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

  const totalPages = Math.ceil(totalVisitors / itemsPerPage);

  return (
    <div style={{ marginBottom: "55px" }}>
      <div className="flex justify-between items-center m-6">
        <div className="flex items-center space-x-2">
          <input
            className="appearance-none border border-indigo-950 rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-950"
            type="text"
            name="first_name"
            value={searchParams.first_name}
            onChange={handleSearchChange}
            placeholder="Search by name"
          />
          {/* <input
            className="appearance-none border border-customGreen rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-700"
            type="text"
            name="last_name"
            value={searchParams.last_name}
            onChange={handleSearchChange}
            placeholder="Search by last name"
          /> */}
          <input
            className="appearance-none border border-indigo-950 rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:indigo-950"
            type="text"
            name="phone"
            value={searchParams.phone}
            onChange={handleSearchChange}
            placeholder="Search by phone number"
          />
          {/* <input
            className="appearance-none border border-customGreen rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-700"
            type="text"
            name="gov_id_no"
            value={searchParams.gov_id_no}
            onChange={handleSearchChange}
            placeholder="Search by govt ID number"
          /> */}
          <select
            value={searchParams.limit}
            onChange={handleLimitChange}
            className="border border-indigo-950 rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none"
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
            className="flex items-center bg-blue-900 text-white py-3 px-5 rounded-3xl"
            onClick={() => {
              onActionClick("addNewVisitor");
              handleClose();
            }}
          >
            <AddIcon className="h-4 w-5 mr-2 " />
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
        <div className="bg-white shadow-md rounded my-6">
          <table className="text-left w-full border-collapse">
            <thead>
              <tr>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">
                  Visitor Image
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Visitor Name
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Visitor Type
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Phone
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Gov ID
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Gov ID No
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Email
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {visitors?.map((visitor, index) => (
                <tr key={visitor.id} className="hover:bg-grey-lighter">
                  <td className="py-1 px-1 border-b border-grey-light">
                    <div className="flex justify-center">
                      <div className="inline-block h-12 w-12 border-2 border-gray-300 rounded-full overflow-hidden bg-blue-900">
                        {visitor.image ? (
                          <img
                            src={`data:image/jpeg;base64,${visitor.image}`}
                            alt="User"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-white bg-blue-900">
                            {visitor.first_name
                              ? visitor.first_name.charAt(0).toUpperCase()
                              : "N"}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light">
                    {visitor.first_name} {visitor.last_name}
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light">
                    {visitor.visitor_type}
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light">
                    {visitor.phone}
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light">
                    {visitor.gov_id_type.replace("_", " ")}
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light">
                    {visitor.gov_id_no}
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light">
                    {visitor.email}
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light">
                    <div className="flex items-center space-x-1">
                      {/* Status Icon */}
                      <MenuItem disableGutters dense>
                        <ListItemIcon className="min-w-0">
                          {visitor.status === "active" ? (
                            <CheckCircleIcon
                              className="text-green-500"
                              fontSize="small"
                            />
                          ) : (
                            <ErrorIcon
                              className="text-red-500"
                              fontSize="large"
                            />
                          )}
                        </ListItemIcon>
                      </MenuItem>

                      {/* View */}
                      <MenuItem
                        onClick={() => onActionClick("view", visitor)}
                        disableGutters
                        dense
                      >
                        <ListItemIcon className="min-w-0">
                          <VisibilityIcon
                            className="text-blue-700"
                            fontSize="large"
                          />
                        </ListItemIcon>
                      </MenuItem>

                      {/* Edit */}
                      <MenuItem
                        onClick={() => onActionClick("update", visitor)}
                        disableGutters
                        dense
                      >
                        <ListItemIcon className="min-w-0">
                          <EditIcon
                            className="text-green-500"
                            fontSize="large"
                          />
                        </ListItemIcon>
                      </MenuItem>

                      {/* Delete */}
                      <MenuItem
                        onClick={() => handleDelete(visitor)}
                        disableGutters
                        dense
                      >
                        <ListItemIcon className="min-w-0">
                          <DeleteIcon
                            className="text-red-500"
                            fontSize="large"
                          />
                        </ListItemIcon>
                      </MenuItem>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={setCurrentPage}
          />
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

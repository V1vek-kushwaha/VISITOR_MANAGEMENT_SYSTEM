import React, { useState, useEffect, useContext } from "react";
import Dialog from '@mui/material/Dialog';
import Paper from '@mui/material/Paper';
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import LockResetIcon from '@mui/icons-material/LockReset';

import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import BlockIcon from '@mui/icons-material/Block';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const UserProfile = ({ open, onClose, user, onActionClick }) => {
  const userData = user;
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentSelectedUser, setCurrentSelectedUser] = useState(user);

  const handleClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setCurrentSelectedUser(user);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm" PaperProps={{ className: "w-1/2 mx-auto" }}>
      <Paper className="p-6 bg-white rounded-lg shadow">
        <div className="text-center border-2 border-gray-300 p-10 rounded-lg shadow-sm">
          <div className="relative">
            <div className="absolute right-0 top-0 p-2">
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={(event) => handleClick(event, user)}
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
                <MenuItem onClick={() => { onActionClick('update', currentSelectedUser); handleClose(); }}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Update" />
                </MenuItem>
                <MenuItem onClick={() => { onActionClick('resetPassword', currentSelectedUser); handleClose(); }}>
                  <ListItemIcon>
                    <LockResetIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Reset Password" />
                </MenuItem>
              </Menu>
            </div>
            <div className="flex justify-center mb-4 mt-2">
              <div className="inline-block h-24 w-24 border-2 border-gray-300 rounded-full overflow-hidden bg-customGreen">
                {userData.image ? (
                  <img src={`data:image/jpeg;base64,${userData.image}`} alt="User" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-white font-bold bg-customGreen">
                    {userData.first_name ? userData.first_name.charAt(0) : 'N'}
                  </div>
                )}
              </div>
            </div>

          </div>
          <div className=" p-1 rounded-lg shadow-sm">
            <div className="mb-2 font-bold text-xl">
              {`${userData.full_name}`}
            </div>
            <div className="divide-y divide-gray-300">
              <InfoItem icon={<PersonIcon color="primary" />} label="User Type" value={userData.role.name} />
              <InfoItem icon={<HomeIcon color="secondary" />} label="Address" value={userData.department.location} />
              <InfoItem icon={<PhoneIcon color="action" />} label="Phone" value={userData.mobile_number} />
              <InfoItem icon={<EmailIcon color="error" />} label="Email" value={userData.email} />
              <InfoItem icon={<BadgeIcon color="info" />} label="Gov ID" value={userData.department_id} />
              <InfoItem icon={<BloodtypeIcon color="warning" />} label="Blood Group" value={userData.blood_group || '+B'} />
              <InfoItem icon={<BlockIcon color={userData.blacklisted ? 'error' : 'success'} />} label="Is Active" value={userData.is_active ? "Yes" : "No"} />
              <InfoItem icon={<VpnKeyIcon color="primary" />} label="Is Staff" value={userData.is_staff ? "Yes" : "No"} />
            </div>
          </div>
        </div>
      </Paper>
    </Dialog>
  );
};

const InfoItem = ({ icon, label, value, isReversed = false }) => (
  <div className={`py-2 flex items-center ${isReversed ? 'justify-between' : ''}`}>
    <div className="flex items-center">
      {icon}
      <span className={`${isReversed ? 'order-last ml-1' : 'ml-1'} font-bold`}>{label}</span>
    </div>
    <span className='ml-1'>:</span>
    {isReversed && <span>{value}</span>}
    {!isReversed && <span className="ml-2">{value}</span>}
  </div>
);

export default UserProfile;

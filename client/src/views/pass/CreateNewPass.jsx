import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import Notification from "../../components/notification";
import { url } from "../../utils/Constants";
import Select from "react-select";
import ViewPass from "./ViewPass";
import MultipleSelectDropdown from "./MultipleSelectDropdown";
import axios from "axios";

function splitFullName(fullName) {
  const parts = fullName?.trim()?.split(" ");

  const firstName = parts[0] || "";
  const lastName = parts?.slice(1)?.join(" ") || "";

  return { firstName, lastName };
}


const CreateNewPass = ({ open, onClose, visitor }) => {
  const { firstName, lastName } = splitFullName(visitor.full_name || "visitors New");

  const initialValues = {
    visitor: visitor.id || "",
    valid_until: "",
    visiting_purpose: "",
    key: "",
    whom_to_visit: "",
    first_name: firstName,
    last_name: lastName,
    visiting_department: "",
    zones_allowed: ["Zone-A"],
  };

  // console.log("see all vistior", visitor);

  const steps = ["Visitor Details", "Meeting Details", "Zone Access"];
  const [passData, setPassData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [keyList, setKeyList] = useState([]);
  const [zoneList, setZoneList] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [isConflict, setIsConflict] = useState(false);
  const [previousVisitor, setPreviousVisitor] = useState({});
  const [showViewPass, setShowViewPass] = useState(false);
  const [passCreated, setPassCreated] = useState({});
  const [passDatas, setPassDatas] = useState({
    visit_purpose: "mukesh conduct meeting",
    whom_to_visit: "HR",
    visit_department: "Human Resources (HR)",
    visitor_id: 1,
    keey: "ABCD1234",
    valid_until: "2025-05-07T17:47:00.000Z",
    zones_allow: ["Lobby", "Meeting Room"],
    zone_names: ["No zones"],
    visitor: {
      first_name: "Mukesh",
      last_name: "Kumar",
      image: "",
      visitor_type: "HR"
    }
  });
  useEffect(() => {
    fetchKeyList();
    fetchZoneList();
  }, [open]);

  useEffect(() => {
    setPassData((currentData) => ({
      ...currentData,
      visitor: visitor?.id,
    }));
  }, [visitor]);

  // console.log("create pass data data", passData);

  const fetchKeyList = async () => {
    // try {
    //     const response = await fetch(`${url}/key/key-info`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${localStorage.getItem('token')}`,
    //         },
    //     });
    //     const json = await response.json();
    //     if (response.ok) {
    //         // const unassignedKeys = json.filter(key => !key.is_assigned);
    //         setKeyList(json);
    //     } else {
    //         Notification.showErrorMessage('Try Again!', json.error);
    //     }
    // } catch (err) {
    //     Notification.showErrorMessage('Error', 'Server error!');
    // }

    // Dummy data instead of API
    const dummyKeys = [
      { id: 1, RFID_key: "RFID-001" },
      { id: 2, RFID_key: "RFID-002" },
      { id: 3, RFID_key: "RFID-003" },
    ];
    setKeyList(dummyKeys);
  };

  const fetchZoneList = async () => {
    // try {
    //     const response = await fetch(`${url}/zone/zone-info`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${localStorage.getItem('token')}`,
    //         },
    //     });
    //     const json = await response.json();
    //     if (response.ok) {
    //         setZoneList(json.map(zone => ({ id: zone.id, name: zone.zone_name })));
    //     } else {
    //         Notification.showErrorMessage('Try Again!', json.error);
    //     }
    // } catch (err) {
    //     Notification.showErrorMessage('Error', 'Server error!');
    // }
    const dummyZones = [
      { id: 1, name: "Zone A" },
      { id: 2, name: "Zone B" },
      { id: 3, name: "Zone C" },
    ];
    setZoneList(dummyZones);
  };

  const handleZoneChange = (newSelectedZones) => {
    setPassData({ ...passData, zones_allowed: newSelectedZones });
    setSelectedZones(newSelectedZones);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassData({ ...passData, [name]: value });
    setErrors({ ...errors, [name]: null });
    setPassDatas({
      visit_purpose: passData.visiting_purpose,
      whom_to_visit: passData.whom_to_visit,
      visit_department: passData.visiting_department,
      visitor_id: initialValues.visitor,
      keey: passData.key,
      valid_until: passData.valid_until,
      zones_allow: passData.zones_allowed,
      zone_names: ["No zones"],
      visitor: {
        first_name: passData.first_name || "N/A",
        last_name: passData.last_name || "N/A",
        image: visitor.profile_image || "",
        visitor_type: visitor.visitor_type || "N/A",
      },
    })

  };

  console.log('passData', passDatas);


  const validate = () => {
    let newErrors = {};
    if (activeStep === 1) {
      if (!String(passData.visitor).trim())
        newErrors.visitor = "Visitor ID is required";
      if (!String(passData?.key)?.trim()) newErrors.key = "Key is required";
      if (!passData.valid_until.trim())
        newErrors.valid_until = "Validity date is required";
    } else if (activeStep === 0) {
      if (!passData.visiting_purpose.trim())
        newErrors.visiting_purpose = "Visiting purpose is required";
      if (!passData.whom_to_visit.trim())
        newErrors.whom_to_visit = "Whom to visit is required";
      if (!passData.visiting_department)
        newErrors.visiting_department = "Visiting department is required";
    } else if (activeStep === 2) {
      if (passData.zones_allowed.length === 0)
        newErrors.zones_allowed = "At least one zone must be selected";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      if (activeStep < steps.length - 1) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };
 
  const handleSubmit = async () => {
    if (!validate()) return;

      try {
        const token = localStorage.getItem("token");

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/pass/visitor_pass/create`,
          passDatas,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const dummyCreatedPass = {
          id: new Date().getTime(),
          ...response.data.data,
          
        };
        const oldData = JSON.parse(localStorage.getItem("visitorPasses")) || [];
        const updatedData = [...oldData, dummyCreatedPass];

        console.log("API Response:", response);
        localStorage.setItem("visitorPasses", JSON.stringify(updatedData));
        Notification.showSuccessMessage(
          response.message,
          'Visitor Pass Created successfully!'
        );
        // setShowDeleteAlert(false);
      } catch (error) {
        console.error("Error pass created:", error);
      }

      setTimeout(() => {
        console.log("new visitore", passData);

        const dummyCreatedPass = {
          id: new Date().getTime(),
          ...passData,
          visitor: {
            first_name: passData.first_name || "N/A",
            last_name: passData.last_name || "N/A",
            image: passData.image || "",
            visitor_type: passData.visitor_type || "N/A",
          },
          zone_names: passData.zone_names || ["No zones"],
          created_at: new Date().toISOString(),
        };

        const oldData = JSON.parse(localStorage.getItem("visitorPasses")) || [];
        const updatedData = [...oldData, dummyCreatedPass];
        // localStorage.setItem("visitorPasses", JSON.stringify(response));

        Notification.showSuccessMessage("Success", "Pass created successfully");
        setPassCreated(dummyCreatedPass);
        setShowViewPass(true);
        setPassData(initialValues);
        handleClose();
      }, 1000);
    };

    const handleOverWriteSubmit = async () => {
      if (!validate()) return;
      // try {
      //   const response = await fetch(
      //     `${url}/passes/visitor-pass-info/overwrite`,
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: `Bearer ${localStorage.getItem("token")}`,
      //       },
      //       body: JSON.stringify(passData),
      //     }
      //   );
      //   const json = await response.json();

      //   if (response.ok) {
      //     Notification.showSuccessMessage("Success", "Pass created successfully");
      //     setPassCreated(json);
      //     setShowViewPass(true);
      //     setPassData(initialValues);
      //     handleClose();
      //     setIsConflict(false);
      //   } else {
      //     Notification.showErrorMessage("Error", "Unable To OverWrite Pass");
      //   }
      // } catch (error) {
      //   Notification.showErrorMessage("Error", "Server error");
      // }

      // just called handleSubmit() directly in dummy mode
      handleSubmit();
    };

    const handleClose = () => {
      onClose();
      setActiveStep(0);
      setErrors({});
      setSelectedZones([]);
      setPassData(initialValues);
    };

    const [selectedZones, setSelectedZones] = useState([]);

    const stepContent = (step) => {
      switch (step) {
        case 0:
          return (
            <div className="flex flex-col space-y-4">
              <label
                htmlFor="visiting_purpose"
                className="text-sm font-medium text-gray-700"
              >
                Visiting Purpose
              </label>
              <input
                type="text"
                id="visiting_purpose"
                name="visiting_purpose"
                placeholder="Visiting Purpose"
                value={passData.visiting_purpose}
                onChange={handleInputChange}
                className={`border-2 p-3 rounded-lg ${errors.visiting_purpose ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.visiting_purpose && (
                <div className="text-red-500 text-xs">
                  {errors.visiting_purpose}
                </div>
              )}

              <label
                htmlFor="whom_to_visit"
                className="text-sm font-medium text-gray-700"
              >
                Whom to Visit
              </label>
              <input
                type="text"
                id="whom_to_visit"
                name="whom_to_visit"
                placeholder="Whom to Visit"
                value={passData.whom_to_visit}
                onChange={handleInputChange}
                className={`border-2 p-3 rounded-lg ${errors.whom_to_visit ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.whom_to_visit && (
                <div className="text-red-500 text-xs">{errors.whom_to_visit}</div>
              )}

              <label
                htmlFor="visiting_department"
                className="text-sm font-medium text-gray-700"
              >
                Visiting Department
              </label>
              <select
                id="visiting_department"
                name="visiting_department"
                value={passData.visiting_department}
                onChange={handleInputChange}
                className={`border-2 p-3 rounded-lg ${errors.visiting_department
                    ? "border-red-500"
                    : "border-gray-300"
                  }`}
              >
                <div>
                  <option value>Select Department</option>
                  {/* Existing Departments */}
                  <option value="Air Force">Air Force</option>
                  <option value="Army">Army</option>
                  <option value="CPWD">CPWD</option>
                  <option value="Defence">Defence</option>
                  <option value="DGQA">DGQA</option>
                  <option value="IFA (Army-Q )">IFA (Army-Q )</option>
                  <option value="MOD">MOD</option>
                  <option value="MTNL">MTNL</option>
                  <option value="Navy">Navy</option>
                  {/* Additional Departments */}
                  <option value="Reception">Reception</option>
                  <option value="Human Resources (HR)">
                    Human Resources (HR)
                  </option>
                  <option value="Administration">Administration</option>
                  <option value="Finance">Finance</option>
                  <option value="Procurement">Procurement</option>
                  <option value="IT Department">IT Department</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Operations">Operations</option>
                  <option value="Legal & Compliance">
                    Legal &amp; Compliance
                  </option>
                  <option value="Facilities Management">
                    Facilities Management
                  </option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Management / Executive Office">
                    Management / Executive Office
                  </option>
                  <option value="Engineering / Technical">
                    Engineering / Technical
                  </option>
                  <option value="Security Department">Security Department</option>
                </div>
              </select>
              {errors.visiting_department && (
                <div className="text-red-500 text-xs">
                  {errors.visiting_department}
                </div>
              )}
            </div>
          );
        case 1:
          return (
            <div className="flex flex-col space-y-4">
              <label
                htmlFor="visitor"
                className="text-sm font-medium text-gray-700"
              >
                Visitor ID
              </label>
              <input
                type="text"
                id="visitor"
                name="visitor"
                placeholder="Visitor ID"
                value={passData.visitor}
                onChange={handleInputChange}
                disabled
                className={`border-2 p-3 rounded-lg ${errors.visitor ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.visitor && (
                <div className="text-red-500 text-xs">{errors.visitor}</div>
              )}

              <label htmlFor="key" className="text-sm font-medium text-gray-700">
                Key
              </label>
              <Select
                classNamePrefix="custom-select"
                value={keyList
                  .map(({ id, RFID_key }) => ({ value: id, label: RFID_key }))
                  .find((option) => option.value === passData.key)}
                onChange={(option) =>
                  handleInputChange({
                    target: {
                      name: "key",
                      value: option ? option.value : "",
                    },
                  })
                }
                options={keyList.map(({ id, RFID_key }) => ({
                  value: id,
                  label: RFID_key,
                }))}
                placeholder="Select Key"
                isClearable={true}
                isSearchable={true}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    border: "2px solid",
                    borderRadius: "0.5rem",
                    padding: "8px",
                    borderColor: "#d1d5db",
                    // borderColor: state.isFocused ? (errors.key ? '#dc2626' : '#d1d5db') : (errors.key ? '#dc2626' : '#d1d5db')
                  }),
                  menu: (base) => ({
                    ...base,
                    maxHeight: "200px",
                    overflow: "auto",
                    padding: "5px",
                  }),
                }}
              />
              {errors.key && (
                <div className="text-red-500 text-xs">{errors.key}</div>
              )}

              <label
                htmlFor="valid_until"
                className="text-sm font-medium text-gray-700"
              >
                Valid Until
              </label>
              <input
                type="datetime-local"
                id="valid_until"
                name="valid_until"
                value={passData.valid_until}
                onChange={handleInputChange}
                className={`border-2 p-3 rounded-lg ${errors.valid_until ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.valid_until && (
                <div className="text-red-500 text-xs">{errors.valid_until}</div>
              )}
            </div>
          );
        case 2:
          return (
            <div className="flex flex-col space-y-4">
              <label className="text-sm font-medium text-gray-700">
                Zones Allowed
              </label>
              <MultipleSelectDropdown
                options={zoneList}
                selectedOptions={selectedZones}
                onChange={handleZoneChange}
              />
              {errors.zones_allowed && (
                <div className="text-red-500 text-xs">{errors.zones_allowed}</div>
              )}
            </div>
          );
        default:
          return "Unknown step";
      }
    };

    const handleCancel = () => {
      setActiveStep(1);
      setIsConflict(false);
    };

    const conflictDialog = (
      <Dialog
        open={isConflict}
        onClose={handleCancel}
        fullWidth
        maxWidth="sm"
        PaperProps={{ className: "w-1/2 overflow-hidden" }}
      >
        <DialogTitle
          as="h2"
          className="text-lg font-bold leading-6 p-2 text-gray-900 text-center"
        >
          Conflict Detected
        </DialogTitle>
        {/* <div className="flex flex-col items-center justify-between p-3"> */}
        <DialogContent className="p-4 text-center">
          <div className="flex justify-center">
            <div className="inline-block h-48 w-48 border-2 border-gray-300 rounded-full overflow-hidden bg-customGreen">
              {previousVisitor.image ? (
                <img
                  src={`data:image/jpeg;base64,${previousVisitor.image}`}
                  alt="Visitor"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-white bg-customGreen">
                  {previousVisitor.first_name
                    ? previousVisitor.first_name.charAt(0).toUpperCase()
                    : "N"}
                </div>
              )}
            </div>
          </div>
          <p className="mt-2">
            Name: {previousVisitor.first_name} {previousVisitor.last_name}
          </p>
          <p className="mt-2">
            Pass created on:{" "}
            {new Date(previousVisitor?.created_on).toLocaleString("en-IN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </p>
        </DialogContent>
        <DialogActions className="flex justify-evenly p-4 border-t">
          <button
            className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={handleOverWriteSubmit}
          >
            Continue
          </button>
        </DialogActions>
        {/* </div> */}
      </Dialog>
    );

    return (
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
          PaperProps={{ className: "w-1/2 mx-auto my-8 p-8 overflow-hidden" }}
        >
          <DialogTitle
            as="h2"
            className="text-lg font-bold leading-6 text-gray-900 text-center"
          >
            Create New Pass
          </DialogTitle>
          <div className="flex items-center justify-between p-3">
            {steps.map((label, index) => (
              <div
                key={label}
                className={`flex-1 ${index <= activeStep ? "bg-green-500" : "bg-gray-200"
                  } h-2 mx-2 rounded-full transition duration-500 ease-in-out`}
              ></div>
            ))}
          </div>
          <div className="px-4 py-5 sm:p-6">
            {stepContent(activeStep)}
            <div className="flex justify-between mt-8">
              <button
                className={`py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${activeStep === 0 ? "bg-gray-300" : "bg-red-500 hover:bg-red-700"
                  }`}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </button>
              {activeStep === steps.length - 1 ? (
                <button
                  className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              ) : (
                <button
                  className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700"
                  onClick={handleNext}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </Dialog>
        {isConflict && conflictDialog}
        {passCreated?.visitor && (
          <ViewPass
            passData={passCreated}
            open={showViewPass}
            onClose={() => setShowViewPass(false)}
          />
        )}
      </>
    );
  };

  export default CreateNewPass;

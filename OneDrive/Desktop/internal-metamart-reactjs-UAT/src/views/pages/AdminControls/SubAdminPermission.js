import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Table,
  Paper,
} from "@material-ui/core";

const formatPermissionCategory = (category) => {
  return category
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camelCase
    .replace(/\b\w/g, (match) => match.toUpperCase()); // Capitalize the first letter of each word
};

const SubAdminPermission = ({ permission, onPermissionChange, isdisabled }) => {
  const [permissions, setPermissions] = useState(permission);

  const handleCheckboxChange = (category, type) => {
    let updatedPermissions;

    if (type === "read" && permissions[category].read) {
      // If deselecting read, automatically deselect write and delete
      updatedPermissions = {
        ...permissions,
        [category]: { read: false, write: false, delete: false },
      };
    } else {
      if (
        (type === "write" || type === "delete") &&
        !permissions[category].read
      ) {
        // If write or delete is selected without read, automatically select read
        updatedPermissions = {
          ...permissions,
          [category]: {
            ...permissions[category],
            read: true,
            [type]: !permissions[category][type],
          },
        };
      } else {
        updatedPermissions = {
          ...permissions,
          [category]: {
            ...permissions[category],
            [type]: !permissions[category][type],
          },
        };
      }
    }

    setPermissions(updatedPermissions);
    onPermissionChange(updatedPermissions);
  };

  return (
    <>
      <div>
        <Typography variant="h6" color="primary">
          Dashboard Permissions
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 500 }}>Category</TableCell>
                <TableCell align="center" style={{ fontWeight: 500 }}>
                  Read
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 500 }}>
                  Write
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 500 }}>
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(permissions).map((category) => (
                <TableRow key={category}>
                  <TableCell component="th" scope="row">
                    {formatPermissionCategory(category)}
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={permissions[category].read}
                      onChange={() => handleCheckboxChange(category, "read")}
                      style={{
                        userSelect: isdisabled ? "none" : "",
                        pointerEvents: isdisabled ? "none" : "",
                        touchAction: isdisabled ? "none" : "",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={permissions[category].write}
                      onChange={() => handleCheckboxChange(category, "write")}
                      style={{
                        userSelect: isdisabled ? "none" : "",
                        pointerEvents: isdisabled ? "none" : "",
                        touchAction: isdisabled ? "none" : "",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={permissions[category].delete}
                      onChange={() => handleCheckboxChange(category, "delete")}
                      style={{
                        userSelect: isdisabled ? "none" : "",
                        pointerEvents: isdisabled ? "none" : "",
                        touchAction: isdisabled ? "none" : "",
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default SubAdminPermission;
